import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { aiSummarizeCode, generateEmbedding } from "./gemini";
import { db } from "@/server/db";
import { Octokit } from "octokit";

//recursive function to calculate number of files in a github repository.
const getFileCount = async (
  path: string,
  octokit: Octokit,
  githubOwner: string,
  githubRepo: string,
  acc: number = 0,
) => {
  // get the contents of the path
  const { data } = await octokit.rest.repos.getContent({
    owner: githubOwner,
    repo: githubRepo,
    path,
  });

  // if data is not array, then it is just one file
  if (!Array.isArray(data) && data.type === "file") {
    return acc + 1;
  }

  // if data is array, means there are subfolders
  if (Array.isArray(data)) {
    let fileCount = 0;
    const directories: string[] = [];

    for (const item of data) {
      // if item is a directory, add it to the list of directories. else, fileCount++
      if (item.type === "dir") {
        directories.push(item.path);
      } else {
        fileCount++;
      }
    }

    // Now if number of directories is more than 0, then do a recursive call to  getFileCount to each directory
    if (directories.length > 0) {
      const directoryCounts = await Promise.all(
        directories.map((dirPath) =>
          getFileCount(dirPath, octokit, githubOwner, githubRepo, 0),
        ),
      );

      fileCount += directoryCounts.reduce((acc, count) => acc + count, 0);
    }

    return acc + fileCount;
  }

  return acc;
};

export const checkCredits = async (githubUrl: string, githubToken?: string) => {
  // find out how many total files are there in the repo

  const octokit = new Octokit({ auth: githubToken });
  const githubOwner = githubUrl.split("/")[3];
  const githubRepo = githubUrl.split("/")[4];

  if (!githubOwner || !githubRepo) {
    return 0;
  }

  const fileCount = await getFileCount("", octokit, githubOwner, githubRepo, 0);
  return fileCount;
};
export const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string,
) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken || "",
    branch: "main",
    ignoreFiles: [
      // Dependency locks & metadata
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "pnpmfile.js",

      // TypeScript configs
      "tsconfig.json",
      "tsconfig.build.json",
      "tsconfig.node.json",
      "tsconfig.spec.json",
      "tsconfig.tsbuildinfo.json",

      // Logs
      "yarn-error.log",
      "yarn-debug.log",
      "npm-debug.log",

      // Licenses & community docs
      "LICENSE",
      "CONTRIBUTING.md",
      "CODE_OF_CONDUCT.md",
      "CHANGELOG.md",

      // Node & build output
      "node_modules/**",
      "public/**",
      "dist/**",
      "build/**",
      ".next/**",
      "out/**",
      "coverage/**",

      // ShadCN or other UI libraries
      "components/ui/**",
      "components/shadcn/**",

      // Config files (not needed for summaries)
      ".eslintrc",
      ".eslintrc.*",
      ".eslintignore",
      ".prettierrc",
      ".prettierrc.*",
      ".prettierignore",
      ".editorconfig",
      ".stylelintrc",
      "vercel.json",
      "firebase.json",

      // IDE & tooling
      ".gitignore",
      ".vscode/**",
      ".idea/**",
      ".husky/**",

      // GitHub workflows
      ".github/**",

      // Tests
      "__tests__/**",
      "**/*.test.*",
      "**/*.spec.*",
      "jest.config.*",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 2,
  });

  const docs = await loader.load();
  return docs;
};

export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
) => {
  const docs = await loadGithubRepo(githubUrl, githubToken);

  const allEmbeddings = await generateEmbeddings(docs);

  await Promise.allSettled(
    allEmbeddings.map(async (embedding, index) => {
      console.log(`processing ${index + 1} of ${allEmbeddings.length}`);

      if (!embedding) {
        return;
      }
      // this just creates a new source code embedding in the database (its a row in the database)

      const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
        data: {
          summary: embedding.summary,
          sourceCode: embedding.sourceCode,
          fileName: embedding.fileName,
          projectId: projectId,
        },
      });

      // as prisma does not support vector format , we need to do it manually by using raw query
      // we need to convert the embedding to vector format and then insert it into the database

      // now where are upadting the embedding in the database by a raw query as prisma does not support vector format
      // we are using the id of the sourceCodeEmbedding to update the embedding in the database
      await db.$executeRaw`
        UPDATE "SourceCodeEmbedding" 
        SET "summaryEmbedding" = ${embedding.embedding}::vector
        WHERE "id" = ${sourceCodeEmbedding.id}`;
    }),
  );
};

// async functions always return a promise
const generateEmbeddings = async (docs: Document[]) => {
  // first it will generate summary of the document and then it will generate embeddings for the document

  // returning the promise of all documents for the async function
  // this will return an array of objects with summary, embedding, sourceCode and fileName
  return await Promise.all(
    docs.map(async (doc) => {
      const summary = await aiSummarizeCode(doc);
      const embedding = await generateEmbedding(summary);

      return {
        summary,
        embedding,
        sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
        fileName: doc.metadata.source,
      };
    }),
  );
};

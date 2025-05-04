import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { aiSummarizeCode, generateEmbedding } from "./gemini";
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
      "package.json",

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
    maxConcurrency: 5,
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
};

const generateEmbeddings = async (docs: Document[]) => {
  // first it will generate summary of the document and then it will generate embeddings for the document

  return await Promise.all(
    docs.map(async (doc) => {
      const summary = await aiSummarizeCode(doc);
      const embedding=await generateEmbedding(summary);
    }),
  );
};

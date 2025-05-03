import { db } from "@/server/db";
import { Octokit } from "octokit";

// very imp db is a prisma client instance
// and it is used to interact with the database
// and it is imported from the server/db file

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

type Response = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: string;
};

export const getCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");

  const owner = match[1] as string;
  const repo = match[2] as string;
  const { data } = await octokit.rest.repos.listCommits({
    owner: owner,
    repo: repo,
    per_page: 100,
    page: 1,
  });

  const sortedCommits = data.sort(
    (a: any, b: any) =>
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime(),
  );

  return sortedCommits.slice(0, 15).map((commit: any) => ({
    commitHash: commit.sha as string,
    commitMessage: (commit.commit.message as string) ?? "",
    commitAuthorName: (commit.commit?.author?.name as string) ?? "",
    commitAuthorAvatar: (commit?.author?.avatar_url as string) ?? "",
    commitDate: (commit.commit?.author?.date as string) ?? "",
  }));
};

export const pullCommits = async (projectId: string) => {
  const { project, githubUrl } = await fetchProjectGithubUrl(projectId);

  const commitHashes = await getCommitHashes(githubUrl);

  const unprocessedCommits = await filterUnprocessedCommits(
    projectId,
    commitHashes,
  );
  // only getting the summary of the unprocessed commits as it reduces api calls to gemini .. the commits already saved in db will not be sent to gemini again

  console.log("unprocessed commits", unprocessedCommits);
  return unprocessedCommits;
};

async function fetchProjectGithubUrl(projectId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: {
      githubUrl: true,
    },
  });

  if (!project?.githubUrl) {
    throw new Error("Project not found or no GitHub URL provided");
  }

  return { project, githubUrl: project?.githubUrl };
}

async function filterUnprocessedCommits(
  projectId: string,
  commitHashes: Response[],
) {
  const processedCommits = await db.commit.findMany({
    where: { projectId },
  });

  const unprocessedCommits = commitHashes.filter(
    (commit) =>
      !processedCommits.some(
        (processedCommit) => processedCommit.commitHash === commit.commitHash,
      ),
  );
  return unprocessedCommits;
}

await pullCommits("cma81k3oc0000wmy4ihe9to13")
  .then(console.log)
  .catch(console.error);

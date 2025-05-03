import { db } from "@/server/db";
import { Octokit } from "octokit";

import axios from "axios";
import { aiSummarizeCommit } from "./gemini";

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

  if (!owner || !repo) throw new Error("Invalid GitHub URL");
  const { data } = await octokit.rest.repos.listCommits({
    owner: owner,
    repo: repo,
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

  const summaryResponses = await Promise.allSettled(
    unprocessedCommits.map((commit) => {
      return summarizeCommit(githubUrl, commit.commitHash);
    }),
  );
  // promise.allsettled is used here to keep the unprocessed commits even if some of the summaries fail to be fetched
  // this is important as we need to save the unprocessed commits in db even if some of the summaries fail to be fetched
  // promise.all is not used here as it will throw an error if any of the promises fail
  // and we will not be able to save the unprocessed commits in db

  const summaries = summaryResponses.map((response) => {
    if (response.status === "fulfilled") {
      return response.value as string;
    }

    return "";
  });
  // saving the unprocessed commits in db with the summaries fetched from gemini
  const commits = await db.commit.createMany({
    data: summaries.map((summary, index) => {
      console.log(`Saving commit ${index + 1} of ${unprocessedCommits.length}`);
      return {
        projectId: projectId,
        commitHash: unprocessedCommits[index]?.commitHash || "",
        commitMessage: unprocessedCommits[index]?.commitMessage || "",
        commitAuthorName: unprocessedCommits[index]?.commitAuthorName || "",
        commitAuthorAvatar: unprocessedCommits[index]?.commitAuthorAvatar || "",
        commitDate: unprocessedCommits[index]?.commitDate || "",
        summary,
      };
    }),
  });
  return commits;
};

async function summarizeCommit(githubUrl: string, commitHash: string) {
  const data = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
    headers: {
      Accept: "application/vnd.github.v3.diff",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  return (await aiSummarizeCommit(data.data)) || "No summary found";
}

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


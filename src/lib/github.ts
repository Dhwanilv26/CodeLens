import { Octokit } from "octokit";

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

const githubUrl = "https://github.com/docker/genai-stack";

export const getCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  const { data } = await octokit.rest.repos.listCommits({
    owner: "docker",
    repo: "genai-stack",
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

console.log(await getCommitHashes(githubUrl));

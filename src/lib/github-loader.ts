import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
export const loadGithubRepository = async (
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

console.log(
  await loadGithubRepository("https://github.com/Dhwanilv26/image-ai"),
);

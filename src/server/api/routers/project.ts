import { pullCommits } from "@/lib/github";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { z } from "zod";
import { indexGithubRepo } from "@/lib/github-loader";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(), // Token is optional, but can be passed
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Access GitHub token directly from the input or ctx
      const token = input.githubToken || process.env.GITHUB_TOKEN;
      
      // Create project
      const project = await ctx.db.project.create({
        data: {
          githubUrl: input.githubUrl,
          name: input.name,
          userToProjects: {
            create: {
              userId: ctx.user.userId!,
            },
          },
        },
      });
      
      // Index the GitHub repo with the token
      await indexGithubRepo(project.id, input.githubUrl, token); // Pass token directly here

      // Pull commits after indexing
      await pullCommits(project.id);
      
      return project;
    }),

  getProjects: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.project.findMany({
      where: {
        userToProjects: {
          some: {
            userId: ctx.user.userId!,
          },
        },
        deletedAt: null,
      },
    });
  }),

  getCommits: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Pull commits directly
      await pullCommits(input.projectId);
      
      return await ctx.db.commit.findMany({
        where: { projectId: input.projectId },
      });
    }),
});

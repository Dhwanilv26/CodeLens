"use client";
import useProject from "@/hooks/use-project";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommitLog from "./commit-log";

const DashBoardPage = () => {
  const { project } = useProject();

  return (
    <div className="space-y-4">
      {project?.id}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="bg-primary w-fit rounded-md px-4 py-3">
          <div className="flex items-center">
            <Github className="size-5 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This project is linked to{" "}
                <Link
                  href={project?.githubUrl ?? ""}
                  className="inline-flex items-center text-white/80 hover:underline"
                >
                  {project?.githubUrl?.split("/").slice(-1)[0]}
                  <ExternalLink className="ml-1 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span>TeamMembers</span>
          <span>InviteButton</span>
          <span>ArchiveButton</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <span>Ask Question</span>
        <span>Meeting Card</span>
      </div>

      <div className="mt-8">
        <CommitLog />
      </div>
    </div>
  );
};

export default DashBoardPage;

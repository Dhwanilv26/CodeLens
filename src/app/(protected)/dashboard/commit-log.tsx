"use client";

import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CommitLog = () => {
  const { project, projectId } = useProject();
  const { data: commits } = api.project.getCommits.useQuery({ projectId });

  return (
    <ul className="w-full space-y-10">
      {commits?.map((commit, commitIdx) => (
        <li
          key={commit.id}
          className="group animate-slide-up relative flex items-start gap-x-8"
        >
          <div
            className={cn(
              commitIdx === commits.length - 1 ? "h-10" : "h-full",
              "absolute top-0 left-6 w-1.5 bg-gradient-to-b from-indigo-300 to-gray-300",
            )}
          >
            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full bg-indigo-600 ring-4 ring-indigo-100 transition-all group-hover:ring-6"></div>
          </div>

          <Image
            src={commit.commitAuthorAvatar}
            alt="commit avatar"
            className="relative mt-3 h-14 w-14 flex-none rounded-full shadow-xl ring-2 ring-white transition-transform group-hover:scale-110 group-hover:shadow-2xl"
            width={56}
            height={56}
          />

          <div className="flex-auto rounded-2xl bg-white p-8 shadow-md ring-1 ring-gray-100 transition-all duration-300 hover:shadow-xl hover:ring-indigo-300">
            <div className="mb-4 flex items-center justify-between gap-x-6">
              <Link
                target="_blank"
                href={`${project?.githubUrl}/commits/${commit.commitHash}`}
                className="group/link flex items-center gap-3 text-sm text-gray-600 transition-all duration-200 hover:text-indigo-600"
              >
                <span className="text-lg font-bold text-gray-900 decoration-indigo-500 group-hover/link:underline">
                  {commit.commitAuthorName}
                </span>
                <span className="inline-flex items-center text-xs font-semibold text-gray-500">
                  committed
                  <ExternalLink className="ml-2 h-5 w-5 text-gray-400 transition-transform group-hover/link:scale-110 group-hover/link:text-indigo-600" />
                </span>
              </Link>
            </div>

            <p className="mb-4 text-xl leading-tight font-semibold tracking-tight text-gray-900">
              {commit.commitMessage}
            </p>

            <pre className="mt-4 rounded-xl border border-gray-100/50 bg-gray-50/80 px-5 py-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-800 shadow-inner">
              {commit.summary}
            </pre>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommitLog;

"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import AskQuestionCard from "../dashboard/ask-question-card";
import Image from "next/image";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";
import { ScrollArea } from "@/components/ui/scroll-area";

const QaPage = () => {
  const { projectId } = useProject();
  const { data: questions } = api.project.getQuestions.useQuery({ projectId });
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const question = questions?.[questionIndex];

  return (
    <Sheet>
      <AskQuestionCard />
      <div className="h-4"></div>
      <h1 className="text-xl font-semibold">Saved Questions</h1>
      <div className="h-2"></div>
      <div className="flex flex-col gap-2">
        {questions?.map((question, index) => {
          return (
            <React.Fragment key={question.id}>
              <SheetTrigger onClick={() => setQuestionIndex(index)}>
                <div className="shadow-border flex items-center gap-4 rounded-lg border bg-white p-4 shadow-md transition-colors hover:bg-gray-50">
                  <Image
                    className="rounded-full"
                    height={30}
                    width={30}
                    src={question.user.imageUrl ?? ""}
                    alt="imgurl"
                  />
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <p className="line-clamp-1 text-lg font-medium text-gray-700">
                        {question.question}
                      </p>
                      <span className="text-xs whitespace-nowrap text-gray-400">
                        {question.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-500">
                      {question.answer}
                    </p>
                  </div>
                </div>
              </SheetTrigger>
            </React.Fragment>
          );
        })}
      </div>

      {question && (
        <SheetContent className="rounded-l-2xl border-l-4 border-blue-200 bg-gradient-to-b from-white to-gray-50 p-6 shadow-2xl sm:max-w-[80vw]">
          <style jsx>{`
            .custom-sheet-content {
              font-family: "Inter", sans-serif;
            }
            .custom-sheet-content h2 {
              font-size: 1.75rem;
              font-weight: 700;
              color: #1f2937;
              margin-bottom: 1rem;
              line-height: 1.2;
            }
            .custom-sheet-content .markdown-content {
              background: #ffffff;
              border-radius: 8px;
              padding: 1.5rem;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              line-height: 1.6;
              color: #374151;
            }
            .custom-sheet-content .markdown-content p {
              margin-bottom: 1rem;
            }
            .custom-sheet-content .markdown-content code {
              background: #f3f4f6;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-size: 0.875rem;
            }
            .custom-sheet-content .markdown-content pre {
              background: #1f2937;
              color: #e5e7eb;
              padding: 1rem;
              border-radius: 8px;
              overflow-x: auto;
            }
          `}</style>
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-bold text-gray-800">
              {question.question}
            </SheetTitle>
          </SheetHeader>
          <div data-color-mode="light" className="custom-sheet-content">
            <ScrollArea className="markdown-content m-auto !h-full max-h-[50vh] max-w-[70vw] overflow-auto">
              <MDEditor.Markdown
                source={question.answer}
                className="overflow-auto"
              />
            </ScrollArea>
          </div>
          <div className="h-8"></div>
          <CodeReferences
            filesReferences={question.filesReferences ?? ([] as any)}
          />
        </SheetContent>
      )}
    </Sheet>
  );
};

export default QaPage;

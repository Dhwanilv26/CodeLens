"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import Image from "next/image";
import { useState } from "react";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";

import MDEditor from "@uiw/react-md-editor";
import { ScrollArea } from "@/components/ui/scroll-area";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [filesReferences, setFileReferences] =
    useState<{ fileName: string; sourceCode: string; summary: string }[]>();
  const [answer, setAnswer] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer("");
    setFileReferences([]);
    e.preventDefault();
    if (!project?.id) {
      return;
    }
    setLoading(true);

    const { output, filesReferences } = await askQuestion(question, project.id);
    setOpen(true);
    setFileReferences(filesReferences);

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[80vw]">
          <DialogHeader>
            <DialogTitle>
              <Image src="/logo.png" alt="logo" height={40} width={40} />
            </DialogTitle>
          </DialogHeader>

          <div data-color-mode="light">
            <ScrollArea className="m-auto !h-full max-h-[40vh] max-w-[70vw] overflow-auto">
              <MDEditor.Markdown source={answer} />
            </ScrollArea>
          </div>
          <Button
            type="button"
            onClick={() => {
              setOpen(false);
            }}
            disabled={loading}
          >
            Close
          </Button>
          {filesReferences?.map((file) => {
            return <span key={file.fileName}>{file.fileName}</span>;
          })}
        </DialogContent>
      </Dialog>
      <Card className="relative col-span-3">
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Which file should I edit to change the home page"
            />
            <div className="h-4"></div>
            <Button type="submit">Ask CodeLens!</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;

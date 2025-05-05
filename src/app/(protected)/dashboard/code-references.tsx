"use client";
import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

type Props = {
  filesReferences: { fileName: string; sourceCode: string; summary: string }[];
};
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";
const CodeReferences = ({ filesReferences }: Props) => {
  const [tab, setTab] = useState(filesReferences[0]?.fileName);

  if (filesReferences.length === 0) {
    return null;
  }
  return (
    <div className="max-w-[70vw]">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex gap-2 overflow-scroll rounded-md bg-gray-200 p-1">
          {filesReferences.map((file) => (
            <button
              onClick={() => setTab(file.fileName)}
              className={cn(
                "text-muted-foreground hover:bg-muted-foreground hover:text-primary-foreground max-w-[80vw] rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                {
                  "bg-primary text-primary-foreground": tab === file.fileName,
                },
              )}
              key={file.fileName}
            >
              {file.fileName}
            </button>
          ))}
        </div>

        {filesReferences.map((file) => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="max-w-7xl rounded-md"
          >
            <div className="max-h-[25vh] w-full overflow-auto">
              <SyntaxHighlighter
                language="typescript"
                style={lucario}
                className="overflow-auto"
              >
                {file.sourceCode}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeReferences;

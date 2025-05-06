"use client";
import { Card } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import React, { useState } from "react";
import { uploadFile } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Presentation, Upload } from "lucide-react";

const MeetingCard = () => {
  const [progress, setProgress] = useState<number | undefined>();
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
    },
    multiple: false,
    maxSize: 50_000_000,
    onDrop: async (acceptedFiles) => {
      setIsUploading(true);
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (!file) return;

      // after getting file, now upload it to cloudinary
      const downloadURL = await uploadFile(file as File, setProgress);
      setIsUploading(false);
    },
  });
  return (
    <Card
      className="col-span-2 flex flex-col items-center justify-center p-10"
      {...getRootProps()}
    >
      {!isUploading && (
        <>
          <Presentation className="h-10 w-10 animate-bounce"></Presentation>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            Create a new meeting
          </h3>
          <p className="mt-1 text-center text-sm text-gray-500">
            Analyse your meeting with CodeLens.
            <br />
            Powered by AI.
          </p>
          <div className="mt-6">
            <Button disabled={isUploading}>
              <Upload className="mr-1.5 -ml-0.5 h-5 w-5" aria-hidden="true" />
              Upload Meeting
              <input className="hidden" {...getInputProps()} />
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default MeetingCard;

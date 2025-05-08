"use client";

import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

import { toast } from "sonner";
import { useRefetch } from "@/hooks/use-refetch";
import { Info } from "lucide-react";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit } = useForm<FormInput>();

  const createProject = api.project.createProject.useMutation();

  const checkCredits = api.project.checkCredits.useMutation();

  const refetch = useRefetch();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  function onSubmit(data: FormInput) {
    if (!!checkCredits.data) {
      createProject.mutate(
        {
          githubUrl: data.repoUrl,
          name: data.projectName,
          githubToken: data.githubToken,
        },
        {
          onSuccess: () => {
            toast.success("Project created successfully");
            refetch();
          },
          onError: () => {
            toast.error("Failed to create project");
          },
        },
      );
    } else {
      checkCredits.mutate({
        githubUrl: data.repoUrl,
        githubToken: data.githubToken,
      });
    }

    return true;
  }
  const hasEnoughCredits = checkCredits?.data?.userCredits
    ? checkCredits.data.fileCount <= checkCredits.data.userCredits
    : true;

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 py-10">
      <div className="flex w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl md:flex-row md:items-center md:gap-12">
        {/* Image Section */}
        <div className="flex justify-center md:w-1/2">
          <Image
            src="/undraw_developer.svg"
            alt="developer"
            width={200}
            height={200}
            className="h-52 w-auto"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md md:w-1/2">
          <h1 className="text-2xl font-semibold text-blue-900">
            Link your GitHub Repository
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter the URL of your repository to link it with CodeLens.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              required
            />
            <Input
              {...register("repoUrl", { required: true })}
              type="url"
              placeholder="GitHub Repository URL"
              required
            />
            <Input
              {...register("githubToken")}
              placeholder="GitHub token (for private repos)"
            />
            {!!checkCredits.data && (
              <div className="mt-4 rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700">
                <div className="flex items-center gap-2">
                  <Info className="size-4" />
                  <p className="text-sm">
                    You will be charged{" "}
                    <strong>{checkCredits.data?.fileCount}</strong> credits for
                    this repository.
                  </p>
                </div>
                <p className="ml-6 text-sm text-blue-600">
                  You have <strong>{checkCredits.data?.userCredits}</strong>{" "}
                  credits remaining.
                </p>
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={
                createProject.isPending ||
                checkCredits.isPending ||
                !hasEnoughCredits
              }
            >
              {!!checkCredits.data ? "Create Project" : "Check Credits"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

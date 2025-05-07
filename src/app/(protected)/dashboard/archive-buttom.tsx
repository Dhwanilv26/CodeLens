"use client";
import { Button } from "@/components/ui/button";
import useProject from "@/hooks/use-project";
import { useRefetch } from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import React from "react";
import { toast } from "sonner";

const ArchiveButton = () => {
  const archiveProject = api.project.archiveProject.useMutation();

  const refetch = useRefetch();

  const { projectId } = useProject();
  return (
    <Button
      onClick={() => {
        const confirm = window.confirm(
          "are you sure you want to archive this project",
        );
        if (confirm) {
          archiveProject.mutate(
            { projectId: projectId },
            {
              onSuccess: () => {
                toast.success("Project deleted successfully");
                refetch();
              },
              onError: () => {
                toast.error("failed to archive project");
              },
            },
          );
        }
      }}
      disabled={archiveProject.isPending}
      size={"sm"}
      variant={"destructive"}
    >
      Delete
    </Button>
  );
};

export default ArchiveButton;

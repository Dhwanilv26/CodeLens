"use client";

import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import Image from "next/image";
import React from "react";

const TeamMembers = () => {
  const { projectId } = useProject();
  const { data: members } = api.project.getTeamMembers.useQuery({ projectId });

  return (
    <div className="flex items-center gap-2">
      {members?.map((member) => (
        <Image
          key={member.id}
          src={member.user.imageUrl ?? ""}
          alt={member.user.firstName ?? ""}
          className="h-8 w-8 rounded-full"
          width={30}
          height={30}
        />
      ))}
    </div>
  );
};

export default TeamMembers;

"use client";

import React, { useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { useMembersStore } from "@/stores/members-store";
import { socket } from "@/lib/sockets";
import { Notification, User } from "@/types/types";
import { randomCategoryEmoji } from "@/lib/utils";

type Props = {};

export default function MemberList({}: Props) {
  const { toast } = useToast();

  const { members, setMembers } = useMembersStore();

  useEffect(() => {
    if (!socket) return;

    socket.on("update-members", (members: User[]) => {
      setMembers(members);
    });
    socket.on("send-notification", ({ title, message }: Notification) => {
      toast({
        title,
        description: message,
      });
    });

    return () => {
      socket.off("update-members");
      socket.off("send-notification");
    };
  }, [toast, setMembers]);

  return (
    <div className="h-80">
      <h1 className="text-center text-2xl font-bold text-slate-700 underline underline-offset-4 decoration-wavy decoration-cyan-400">
        Member List
      </h1>
      <ul className="mt-6">
        {members &&
          members.map((member) => (
            <div key={member.id} className="flex items-center">
              <span className="text-3xl">{randomCategoryEmoji()}</span>
              <p className="text-slate-700">{member.username}</p>
            </div>
          ))}
      </ul>
    </div>
  );
}

"use client";

import Canvas from "@/components/canvas";
import { GradientPicker } from "@/components/color-picker";
import { useCanvasMember } from "@/components/providers/canvas-member";
import { useSocket } from "@/components/providers/socket-provider";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Notification, User } from "@/types/types";
import { Eraser } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {};

export default function page({}: Props) {
  const [background, setBackground] = useState("#B4D455");
  const [strokeWidth, setStrokeWidth] = useState<number[]>([3]);

  const { members, setMembers } = useCanvasMember();
  const { isConnected, socket } = useSocket();
  const { toast } = useToast();

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
    <div className="flex gap-4">
      <div className="w-48 h">
        <div className="h-80">
          <h1>Member List</h1>
          {isConnected ? (
            <p className="text-green-800">Socket Connected </p>
          ) : (
            <p className="text-red-700">Socket not connectted</p>
          )}
          <ul>
            {members &&
              members.map((member) => (
                <li key={member.id}>{member.username}</li>
              ))}
          </ul>
        </div>
        <p>Line color</p>
        <div style={{ background }} className="p-2 rounded-md mt-2">
          <GradientPicker
            className="w-full p-2"
            background={background}
            setBackground={setBackground}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex justify-between">
            <span>Stroke Width</span>
            <span>{strokeWidth}</span>
          </div>
          <Slider
            min={1}
            max={30}
            step={1}
            value={strokeWidth}
            onValueChange={setStrokeWidth}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="Stroke width"
          />
        </div>

        <Button size="icon" variant="outline" className="mt-4">
          <Eraser className="text-slate-600" />
        </Button>
      </div>
      <div>
        <Canvas background={background} strokeWidth={strokeWidth} />
      </div>
      <div className="w-48">Chat screen</div>
    </div>
  );
}

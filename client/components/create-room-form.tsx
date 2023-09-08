"use client";

import { CreateRoomSchema } from "@/lib/validations/room";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CopyButton from "./copy-button";
import { useSocket } from "./providers/socket-provider";
import { useEffect, useState } from "react";
import { Loader2, ShipIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useCanvasMember } from "./providers/canvas-member";
import { RoomJoinedData } from "@/types/types";

interface CreateRoomProps {
  roomId: string;
}

export default function CreateRoomForm({ roomId }: CreateRoomProps) {
  const [loading, setIsLoading] = useState<boolean>();
  const router = useRouter();

  const { setUser, setMembers } = useCanvasMember();
  const { socket } = useSocket();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit({ username }: z.infer<typeof CreateRoomSchema>) {
    console.log(username, roomId);
    setIsLoading(true);
    socket.emit("create-room", { roomId, username });
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("room-joined", ({ user, roomId, members }: RoomJoinedData) => {
      setUser(user);
      setMembers(members);
      router.replace(`/${roomId}`);
    });

    function handleErrorMessage({ message }: { message: string }) {
      toast({
        title: "Failed to join room!",
        description: message,
      });
    }

    socket.on("room-not-found", handleErrorMessage);

    socket.on("invalid-data", handleErrorMessage);

    return () => {
      socket.off("room-joined");
      socket.off("room-not-found");
      socket.off("invalid-data", handleErrorMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("room-not-found", () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p className="mb-2 text-sm font-medium">Room ID</p>
          <div className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
            <span>{roomId}</span>
            <CopyButton value={roomId} />
          </div>
        </div>
        <Button className="w-full" type="submit">
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <>
              <ShipIcon className="w-4 h-4 mr-2" />
              Create a room
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

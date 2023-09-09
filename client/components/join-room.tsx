"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { JoinRoomSchema } from "@/lib/validations/room";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useSocket } from "./providers/socket-provider";
import { useEffect, useState } from "react";
import { RoomJoinedData } from "@/types/types";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useMembersStore } from "@/stores/members-store";
import { useUserStore } from "@/stores/user-store";

interface JoinRoomProps {}

export default function JoinRoom({}: JoinRoomProps) {
  const form = useForm<z.infer<typeof JoinRoomSchema>>({
    resolver: zodResolver(JoinRoomSchema),
    defaultValues: {
      username: "",
      roomId: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { socket } = useSocket();
  const router = useRouter();
  const { setMembers } = useMembersStore();
  const { setUser } = useUserStore();
  const { toast } = useToast();

  function onSubmit({ roomId, username }: z.infer<typeof JoinRoomSchema>) {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Join Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Room</DialogTitle>
          <DialogDescription>
            Join Private room with your friends.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Room ID" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Join Room
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

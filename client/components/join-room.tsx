"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { JoinRoomSchema } from "@/lib/validations/room";
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
import { useEffect, useState } from "react";
import { RoomJoinedData } from "@/types/types";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useMembersStore } from "@/stores/members-store";
import { useUserStore } from "@/stores/user-store";
import { socket } from "@/lib/sockets";
import { Loader2 } from "lucide-react";
// import useAvatar from "@/hooks/useAvatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JoinRoomProps {}

export default function JoinRoom({}: JoinRoomProps) {
  const form = useForm<z.infer<typeof JoinRoomSchema>>({
    resolver: zodResolver(JoinRoomSchema),
    defaultValues: {
      username: "",
      roomId: "",
      avatarStyle: "avataaars",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { avatar } = useAvatar();

  // console.log(avatar);

  const router = useRouter();
  const { setMembers } = useMembersStore();
  const { setUser } = useUserStore();
  const { toast } = useToast();

  let avatarUrl = `https://api.dicebear.com/7.x/${form.getValues(
    "avatarStyle"
  )}/svg?seed=${form.getValues("username")}`;

  function onSubmit({ roomId, username }: z.infer<typeof JoinRoomSchema>) {
    setIsLoading(true);
    socket.emit("join-room", { roomId, username, avatarUrl });
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

        {/* {avatar && <img src={avatar} alt="Avatar" />} */}

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
            <div className="flex justify-center items-center">
              <img
                src={avatarUrl}
                alt="user avatar"
                className="w-24 h-24 rounded-full"
              />
            </div>
            <FormField
              control={form.control}
              name="avatarStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar Style</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Avatar Style" />
                      </SelectTrigger>
                      <SelectContent className="capitalize">
                        <SelectItem value="avataaars">avataaars</SelectItem>
                        <SelectItem value="micah">micah</SelectItem>
                      </SelectContent>
                    </Select>
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
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Join Room
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

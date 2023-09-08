import CreateRoomForm from "@/components/create-room-form";
import JoinRoom from "@/components/join-room";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { nanoid } from "nanoid";

export default function Home() {
  const roomId = nanoid(10);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-[90vw] max-w-[400px]">
        <CardHeader>
          <CardTitle>Scribble</CardTitle>
          <CardDescription>
            Draw on the same canvas with your friends in real-time.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col space-y-4">
          <CreateRoomForm roomId={roomId} />

          <div className="flex items-center space-x-2 ">
            <Separator />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator />
          </div>

          <JoinRoom />
        </CardContent>
      </Card>
    </main>
  );
}

import Canvas from "@/components/canvas";
import CanvasTools from "@/components/canvas-tools";
import Chat from "@/components/chat";
import MemberList from "@/components/member-list";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex gap-4">
      <div className="md:my-6 rounded-md border p-4 w-60">
        <MemberList />
        <CanvasTools />
      </div>
      <div className="h-screen flex justify-center items-center">
        <Canvas />
      </div>
      <div className="rounded-md w-60 p-4 md:my-6 flex flex-col justify-between border">
        <Chat />
      </div>
    </div>
  );
}

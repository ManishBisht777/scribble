"use client";

import useDraw from "@/hooks/useDraw";
import { socket } from "@/lib/sockets";
import { clearCanvas, draw, drawWithDataURL } from "@/lib/utils";
import { useCanvasStore } from "@/stores/canvas-store";
import { useUserStore } from "@/stores/user-store";
import { Draw, DrawOptions } from "@/types/canvas";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

export default function Canvas({}: Props) {
  const { roomId } = useParams();

  const { canvasRef, onMouseDown } = useDraw(onDraw);
  const { strokeColor, strokeWidth } = useCanvasStore();
  const { user } = useUserStore();
  const router = useRouter();

  if (!user) router.push("/");

  function onDraw({ ctx, currentPoint, prevPoint }: Draw) {
    const drawOptions = {
      ctx,
      currentPoint,
      prevPoint,
      strokeColor,
      strokeWidth,
    };
    draw(drawOptions);
    socket.emit("draw", { drawOptions, roomId });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !roomId) return;

    socket.emit("client-ready", roomId);

    socket.on("get-canvas-state", () => {
      const canvasState = canvasRef.current?.toDataURL();
      if (!canvasState) return;

      socket.emit("send-canvas-state", { canvasState, roomId });
    });

    socket.on("canvas-state-from-server", (canvasState: string) => {
      if (!ctx || !canvas) return;

      drawWithDataURL(canvasState, ctx, canvas);
    });

    socket.on("update-canvas-state", (drawOptions: DrawOptions) => {
      if (!ctx) return;
      draw({ ...drawOptions, ctx });
    });

    socket.on("clear-canvas", () => {
      if (!ctx || !canvas) return;
      clearCanvas(roomId as string, socket);
    });

    return () => {
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("update-canvas-state");
    };
  }, [canvasRef, roomId]);

  return (
    <canvas
      id="canvas"
      onMouseDown={onMouseDown}
      ref={canvasRef}
      width="800"
      height="700"
      className="border rounded-lg"
    />
  );
}

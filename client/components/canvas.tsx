"use client";

import useDraw from "@/hooks/useDraw";
import { useCanvasStore } from "@/stores/canvas-store";

type Props = {};

export default function Canvas({}: Props) {
  const { canvasRef, onMouseDown } = useDraw(drawLine);

  const { strokeColor, strokeWidth } = useCanvasStore();

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;

    let startPoint = prevPoint ?? currentPoint;

    ctx.lineWidth = strokeWidth[0];
    ctx.strokeStyle = strokeColor;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();
  }

  return (
    <canvas
      onMouseDown={onMouseDown}
      ref={canvasRef}
      width="900"
      height="700"
      className="border rounded-sm"
    />
  );
}

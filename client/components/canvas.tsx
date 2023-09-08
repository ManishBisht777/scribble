"use client";

import useDraw from "@/hooks/useDraw";

type Props = {
  background: string;
  strokeWidth: number[];
};

export default function Canvas({ background, strokeWidth }: Props) {
  const { canvasRef, onMouseDown } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;

    let startPoint = prevPoint ?? currentPoint;

    ctx.lineWidth = strokeWidth[0];
    ctx.strokeStyle = background;
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

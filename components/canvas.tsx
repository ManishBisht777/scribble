"use client";

import useDraw from "@/hooks/useDraw";

type Props = {
  background: string;
};

export default function Canvas({ background }: Props) {
  const { canvasRef, onMouseDown } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = background;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
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

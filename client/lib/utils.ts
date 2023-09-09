import { DrawOptions } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function draw({
  ctx,
  currentPoint,
  prevPoint,
  strokeColor,
  strokeWidth,
}: DrawOptions) {
  const startPoint = prevPoint ?? currentPoint;

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth[0];
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currentPoint.x, currentPoint.y);
  ctx.stroke();
}

export function drawWithDataURL(
  dataURL: string,
  ctx: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement
) {
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(img, 0, 0);
  };
}

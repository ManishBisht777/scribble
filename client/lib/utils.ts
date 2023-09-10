import { DrawOptions } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import { Socket } from "socket.io-client";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomCategoryEmoji() {
  const categories: any = {
    person: ["👨", "👩", "👴", "👵", "🧑", "🧒", "👶"],
    animal: ["🐶", "🐱", "🐰", "🦁", "🐢", "🐙", "🦄"],
    food: ["🍕", "🍔", "🍩", "🍦", "🍓", "🍟", "🍝"],
    transportation: ["🚗", "🚲", "🚁", "🛳️", "🚆", "✈️", "🚀"],
    nature: ["🌳", "🌻", "🌊", "🌄", "🌵", "🌸", "🌈"],
    fantasy: ["🧚", "🧞", "🐉", "🧜", "🔮", "🚪", "🏰"],
  };

  const categoryKeys = Object.keys(categories);
  const randomCategory =
    categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
  const emojisForCategory = categories[randomCategory];
  const randomEmoji =
    emojisForCategory[Math.floor(Math.random() * emojisForCategory.length)];

  return randomEmoji;
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

export function clearCanvas(roomId: string, socket: Socket) {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit("clear-canvas", roomId);
}

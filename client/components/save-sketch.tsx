"use client";

import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function SaveButton() {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    canvasRef.current = canvasElement;
  }, []);

  const saveCanvas = () => {
    if (!canvasRef.current) return;

    const linkEl = document.createElement("a");
    linkEl.download = "sketch.png";
    linkEl.href = canvasRef.current.toDataURL();
    linkEl.click();
    linkEl.remove();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="mt-4"
            onClick={saveCanvas}
          >
            <Camera className="text-slate-600" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save Sketch</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

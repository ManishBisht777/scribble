"use client";

import { useEffect, useRef, useState } from "react";

export default function useDraw(
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevPointRef = useRef<Point | null>(null);

  const onMouseDown = () => setIsMouseDown(true);
  const mouseUpHandler = () => {
    setIsMouseDown(false);
    prevPointRef.current = null;
  };

  useEffect(() => {
    const mousemoveHandler = (e: MouseEvent) => {
      if (!isMouseDown) return;

      const currentPoint = getRelativePointOnCanvas(e);

      const canvasContext = canvasRef.current?.getContext("2d");
      if (!canvasContext || !currentPoint) return;

      onDraw({
        ctx: canvasContext,
        prevPoint: prevPointRef.current,
        currentPoint,
      });
      prevPointRef.current = currentPoint;
    };

    // compute points relative to canvas
    const getRelativePointOnCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const canvasBoundary = canvas.getBoundingClientRect();

      const x = e.clientX - canvasBoundary.left;
      const y = e.clientY - canvasBoundary.top;

      return { x, y };
    };

    canvasRef.current?.addEventListener("mousemove", mousemoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      canvasRef.current?.removeEventListener("mousemove", mousemoveHandler);

      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [onDraw]);

  return { canvasRef, onMouseDown };
}

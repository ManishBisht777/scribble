"use client";

import React from "react";
import { GradientPicker } from "./color-picker";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import {
  Camera,
  DoorClosed,
  Eraser,
  PaintBucket,
  Pen,
  Trash2,
} from "lucide-react";
import { useCanvasStore } from "@/stores/canvas-store";

type Props = {};

export default function CanvasTools({}: Props) {
  const { setStrokeColor, strokeColor, strokeWidth, setStrokeWidth } =
    useCanvasStore();

  return (
    <div>
      <p>Pen color</p>
      <div
        style={{
          background: strokeColor,
        }}
        className="p-2 rounded-md mt-2"
      >
        <GradientPicker
          className="w-full p-2"
          background={strokeColor}
          setBackground={setStrokeColor}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex justify-between">
          <span>Pen Width</span>
          <span>{strokeWidth}</span>
        </div>
        <Slider
          min={1}
          max={30}
          step={1}
          value={strokeWidth}
          onValueChange={setStrokeWidth}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="Stroke width"
        />
      </div>
      <div className="flex gap-3 mt-2">
        <Button size="icon" variant="outline" className="mt-4">
          <Eraser className="text-slate-600" />
        </Button>
        <Button size="icon" variant="outline" className="mt-4">
          <Pen className="text-slate-600" />
        </Button>
        <Button size="icon" variant="outline" className="mt-4">
          <Camera className="text-slate-600" />
        </Button>
        <Button size="icon" variant="outline" className="mt-4">
          <PaintBucket className="text-slate-600" />
        </Button>
      </div>
      <div className="flex mt-4 justify-between">
        <Button className="px-6">
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Canvas
        </Button>
        <Button size="icon" variant="destructive">
          <DoorClosed className="w-4 h-4" />
        </Button>
      </div>
      {/* <p className="text-center mt-2 text-slate-600 self-end">
        Made by Manish with ❤️
      </p> */}
    </div>
  );
}

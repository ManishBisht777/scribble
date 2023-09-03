"use client";

import Canvas from "@/components/canvas";
import { ColorPicker, GradientPicker } from "@/components/color-picker";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

type Props = {};

export default function page({}: Props) {
  const [background, setBackground] = useState("#B4D455");

  return (
    <div className="flex gap-4">
      <div className="w-48 h">
        <div className="h-80">
          <h1>Member List</h1>
          <ul>
            <li>Manish</li>
            <li>Manish</li>
            <li>Manish</li>
            <li>Manish</li>
          </ul>
        </div>
        <div style={{ background }} className="p-2 rounded-md">
          <GradientPicker
            className="w-full p-2"
            background={background}
            setBackground={setBackground}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <p>Stroke Width</p>
          <Slider defaultValue={[5]} max={30} step={1} />
        </div>
      </div>
      <div>
        <Canvas background={background} />
      </div>
      <div className="w-48">Chat screen</div>
    </div>
  );
}

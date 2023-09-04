"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { useMemo, useState } from "react";

export function ColorPicker() {
  const [background, setBackground] = useState("#B4D455");

  return (
    <div
      className="preview flex justify-center p-2 items-center rounded !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  );
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    "#09203f", // Dark Blue
    "#E2E2E2", // Light Grey
    "#ffe83f", // Yellow
    "#9fff5b", // Light Green
    "#70e2ff", // Light Blue
    "#cd93ff", // Light Purple
    "#ff75c3", // Light Pink
    "#ffa647", // Orange

    "#FFD1DC", // Soft Pink
    "#E6E6FA", // Pale Lavender
    "#AEEEEE", // Baby Blue
    "#98FB98", // Mint Green
    "#FFDAB9", // Peach
    "#CCCCFF", // Lavender Blue
    "#FFFFE0", // Light Yellow
    "#B2DFDB", // Pastel Green
    "#C8A2C8", // Lilac
    "#EEE8AA", // Pale Gold

    "#F0E68C", // Khaki
    "#FFB6C1", // Light Pink
    "#87CEEB", // Sky Blue
    "#FFA07A", // Light Salmon
    "#B0E0E6", // Powder Blue
    "#FF6347", // Tomato
    "#DDA0DD", // Plum
    "#F5DEB3", // Wheat
    "#98FB98", // Pale Green
    "#9370DB", // Medium Purple

    "#F5F5DC", // Beige
    "#FFE4B5", // Moccasin
    "#F0F8FF", // Alice Blue
    "#FAEBD7", // Antique White
    "#FFF5EE", // Seashell
    "#FFE4E1", // Misty Rose
    "#F5F5F5", // White Smoke
    "#FDF5E6", // Old Lace
    "#E0FFFF", // Light Cyan
    "#E6E6E6", // Light Grey
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              //   <Paintbrush className="h-4 w-4" />
              <div>&</div>
            )}
            <div className="truncate flex-1">
              {background ? background : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue="solid" className="w-full">
          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}

const GradientButton = ({
  background,
  children,
}: {
  background: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
        {children}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { Input } from "./ui/input";

type Props = {};

export default function Chat({}: Props) {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-slate-700">Chat</h1>
        <p className="text-slate-600 text-sm">
          Chat with your friends in realtime
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <Input placeholder="Chat here" />
        {/* <Button size="icon" variant="outline">
    <Send className="w-5 h-5 text-slate-800" />
  </Button> */}
      </div>
    </>
  );
}

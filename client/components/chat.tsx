"use client";

import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { socket } from "@/lib/sockets";
import { useMessageStore } from "@/stores/message-store";
import { ScrollArea } from "./ui/scroll-area";

type Props = {};

export const ChatSchema = z.object({
  message: z.string().nonempty(),
});

export default function Chat({}: Props) {
  const { roomId } = useParams();

  const form = useForm<z.infer<typeof ChatSchema>>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      message: "",
    },
  });

  const { messages, setMessages } = useMessageStore();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  function onSubmit({ message }: z.infer<typeof ChatSchema>) {
    if (!roomId) return console.error("No room id");

    const chatMessage = {
      message: message,
      roomId: roomId,
    };
    socket.emit("send-message", chatMessage);
    form.reset();

    setMessages((prevMessages) => [...prevMessages, message]);
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current == null) return;

    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    socket.on("new-message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("new-message");
    };
  }, []);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-slate-700">Chat</h1>
        <p className="text-slate-600 text-sm">
          Chat with your friends in realtime
        </p>
      </div>
      <ScrollArea className="h-full rounded-md border p-4">
        {messages.map((message, i) => (
          <div key={i} className="h-8">
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Chat here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}

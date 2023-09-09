import React from "react";

interface RoomLayoutProps {
  children: React.ReactNode;
}

export default function RoomLayout({ children }: RoomLayoutProps) {
  return <main className="container flex justify-center ">{children}</main>;
}

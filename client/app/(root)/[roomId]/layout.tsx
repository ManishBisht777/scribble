import React from "react";

interface RoomLayoutProps {
  children: React.ReactNode;
}

export default function RoomLayout({ children }: RoomLayoutProps) {
  return (
    <main className="container">
      <h1>header</h1>
      {children}
    </main>
  );
}

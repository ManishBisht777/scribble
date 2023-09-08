"use client";

import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  username: string;
}

interface CanvasMemberType {
  user: User | null;
  setUser: (user: User) => void;
  members: User[];
  setMembers: (members: User[]) => void;
}

const CanvasMemberContext = createContext<CanvasMemberType>({
  user: null,
  setUser: () => {},
  members: [],
  setMembers: () => {},
});

export const useCanvasMember = () => {
  return useContext(CanvasMemberContext);
};

export const CanvasMemberProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);

  return (
    <CanvasMemberContext.Provider
      value={{ user, setUser, members, setMembers }}
    >
      {children}
    </CanvasMemberContext.Provider>
  );
};

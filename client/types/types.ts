export interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

export interface RoomJoinedData {
  user: User;
  roomId: string;
  members: User[];
}

export interface Notification {
  title: string;
  message: string;
}

export interface Message {
  user: User;
  message: string;
}

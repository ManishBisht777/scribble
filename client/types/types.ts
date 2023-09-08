export interface User {
  id: string;
  username: string;
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

export interface JoinRoomData {
  roomId: string;
  username: string;
  avatarUrl: string;
}

export interface User {
  id: string;
  username: string;
  roomId: string;
  avatarUrl: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface DrawProps {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | undefined;
}

export interface DrawOptions extends DrawProps {
  strokeColor: string;
  strokeWidth: number[];
}

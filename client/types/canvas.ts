export interface Draw {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
}

export interface Point {
  x: number;
  y: number;
}

export interface DrawOptions extends Draw {
  strokeColor: string;
  strokeWidth: number[];
  isEraser: boolean;
}

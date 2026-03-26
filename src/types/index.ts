export interface Trail {
  x: number;
  y: number;
}

export interface TrailSegment {
  points: Trail[];
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export interface Landmark {
  x: number;
  y: number;
  z?: number;
}

export type GestureState = 'idle' | 'writing' | 'transitioning';

export interface DrawingState {
  isDrawing: boolean;
  wasDrawing: boolean;
  gestureState: GestureState;
}

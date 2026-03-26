import type { Landmark, DrawingState, GestureState } from '@/types';
import { shouldDraw } from './detectGesture';

let drawFrames = 0;
let isDrawing = false;
let wasDrawing = false;

export function updateDrawingState(landmarks: Landmark[]): DrawingState {
  wasDrawing = isDrawing; // Store previous state
  
  if (shouldDraw(landmarks)) {
    drawFrames++;
  } else {
    drawFrames--;
  }

  drawFrames = Math.max(0, Math.min(drawFrames, 5));

  isDrawing = drawFrames > 2;

  const gestureState: GestureState = isDrawing ? 'writing' : 'idle';

  return {
    isDrawing,
    wasDrawing,
    gestureState
  };
}

export { isDrawing, wasDrawing };

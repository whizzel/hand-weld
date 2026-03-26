import type { Trail, TrailSegment } from '@/types';
import { isDrawing, wasDrawing } from '../gesture/drawingState';
import { createSpark } from './particleSystem';

let trailSegments: TrailSegment[] = [];
let currentSegment: Trail[] = [];

export function addIndexPoint(x: number, y: number) {
  if (isDrawing) {
    // If we just started drawing (wasn't drawing before), start a new segment
    if (!wasDrawing) {
      // Save previous segment if it has points
      if (currentSegment.length > 0) {
        trailSegments.push({ points: [...currentSegment] });
      }
      // Start new segment
      currentSegment = [{ x, y }];
    } else {
      // Continue current segment
      currentSegment.push({ x, y });
    }
    
    // 🔥 Create sparks at writing position
    createSpark(x, y);
  }
}

export function getTrailSegments(): TrailSegment[] {
  return trailSegments;
}

export function getCurrentSegment(): Trail[] {
  return currentSegment;
}

export function clearTrail() {
  trailSegments = [];
  currentSegment = [];
}

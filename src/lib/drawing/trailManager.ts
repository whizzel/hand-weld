import type { Trail, TrailSegment } from '@/types';
import { isDrawing, wasDrawing } from '../gesture/drawingState';
import { createSpark } from './particleSystem';

let trailSegments: TrailSegment[] = [];
let currentSegment: Trail[] = [];
const MAX_TRAIL_SEGMENTS = 50; // Limit memory usage

export function addIndexPoint(x: number, y: number) {
  if (isDrawing) {

    if (!wasDrawing) {
      if (currentSegment.length > 0) {
        trailSegments.push({ points: [...currentSegment] });
        // Remove oldest segments if limit exceeded
        if (trailSegments.length > MAX_TRAIL_SEGMENTS) {
          trailSegments.shift(); // Remove oldest segment
        }
      }
      currentSegment = [{ x, y }];
    } else {
      currentSegment.push({ x, y });
    }
    
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

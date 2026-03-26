import type { TrailSegment } from '@/types';
import { getTrailSegments, getCurrentSegment, addIndexPoint, clearTrail } from './trailManager';
import { updateAndDrawParticles, clearParticles } from './particleSystem';

export { addIndexPoint, clearTrail };

export function updateAndDraw(ctx: CanvasRenderingContext2D) {
  // Draw all completed segments
  const trailSegments = getTrailSegments();
  trailSegments.forEach(segment => {
    if (segment.points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(segment.points[0].x, segment.points[0].y);
      
      for (let i = 1; i < segment.points.length; i++) {
        ctx.lineTo(segment.points[i].x, segment.points[i].y);
      }
      
      ctx.strokeStyle = "rgba(255, 255, 0, 1)"; // Solid yellow
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }
  });

  // Draw current segment
  const currentSegment = getCurrentSegment();
  if (currentSegment.length > 1) {
    ctx.beginPath();
    ctx.moveTo(currentSegment[0].x, currentSegment[0].y);
    
    for (let i = 1; i < currentSegment.length; i++) {
      ctx.lineTo(currentSegment[i].x, currentSegment[i].y);
    }
    
    ctx.strokeStyle = "rgba(255, 255, 0, 1)"; // Solid yellow
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  // ✨ Draw sparks
  updateAndDrawParticles(ctx);
}

export function clearAll() {
  clearTrail();
  clearParticles();
}

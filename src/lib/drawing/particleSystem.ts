import type { Particle } from '@/types';

let particles: Particle[] = [];

// 🎨 Color transition (white → orange → red)
function getColor(lifeRatio: number) {
  if (lifeRatio > 0.6) return `rgba(255,255,255,${lifeRatio})`; // hot core
  if (lifeRatio > 0.3) return `rgba(255,150,0,${lifeRatio})`; // orange
  return `rgba(255,50,0,${lifeRatio})`; // red fade
}

// 🔥 Create Sparks at writing position
export function createSpark(x: number, y: number) {
  for (let i = 0; i < 15; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 40 + Math.random() * 20,
      maxLife: 60,
      size: Math.random() * 2 + 1,
    });
  }
}

export function updateAndDrawParticles(ctx: CanvasRenderingContext2D) {
  const newParticles: Particle[] = [];

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // physics
    p.x += p.vx;
    p.y += p.vy;

    p.vy += 0.15;      // gravity
    p.vx *= 0.98;      // air resistance
    p.vy *= 0.98;

    p.life--;

    if (p.life <= 0) continue;

    const lifeRatio = p.life / p.maxLife;

    // 🔥 glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = "orange";

    // 🎨 color based on life
    ctx.fillStyle = getColor(lifeRatio);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;

    newParticles.push(p);
  }

  particles = newParticles;
}

export function clearParticles() {
  particles = [];
}

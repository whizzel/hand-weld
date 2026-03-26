import type { Particle } from '@/types';

let particles: Particle[] = [];

// 🎨 Color transition (white → orange → red)
function getColor(lifeRatio: number) {
  if (lifeRatio > 0.6) return `rgba(255,255,255,${lifeRatio})`; // hot core
  if (lifeRatio > 0.3) return `rgba(255,255,0,${lifeRatio})`; // yellow
  return `rgba(255,50,0,${lifeRatio})`; // red fade
}


export function createSpark(x: number, y: number) {
  for (let i = 0; i < 8; i++) {
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

    p.vy += 0.15;      // dharti maa ka pyar
    p.vx *= 0.98;      // hava ka saath
    p.vy *= 0.98;      // hava ka saath

    p.life--;

    if (p.life <= 0) continue;

    const lifeRatio = p.life / p.maxLife;

    // glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = "yellow";

    //color based on life
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

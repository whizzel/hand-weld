import { useEffect, useRef } from 'react';
import { addIndexPoint, updateAndDraw, clearTrail } from '@/lib/drawing/renderer';
import { updateDrawingState } from '@/lib/gesture/drawingState';

export function useHandTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Set canvas to full screen size
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        // Maximum screen coverage
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Also update camera resolution for best quality (mobile optimized)
        if (videoRef.current) {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          const maxWidth = isMobile ? 1280 : window.innerWidth;
          const maxHeight = isMobile ? 720 : window.innerHeight;
          
          videoRef.current.width = Math.min(window.innerWidth, maxWidth);
          videoRef.current.height = Math.min(window.innerHeight, maxHeight);
        }
      }
    };

    // Initial setup
    updateCanvasSize();
    
    // Handle window resize
    window.addEventListener('resize', updateCanvasSize);
    
    // Handle orientation change for mobile devices
    window.addEventListener('orientationchange', () => {
      setTimeout(updateCanvasSize, 100);
    });

    if (!videoRef.current) return;

    const initializeHandTracking = async () => {
      const { Hands } = await import("@mediapipe/hands");
      const { Camera } = await import("@mediapipe/camera_utils");

      // Mobile detection
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      
      const hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: any) => {
        const canvas = canvasRef.current;
        // Throttle rendering for better performance
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;


        ctx.save();

        // 🔁 mirror
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);


        // ✅ cinematic clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];

        const index = landmarks[8]; // Index finger tip

        updateDrawingState(landmarks);

        const indexX = index.x * canvas.width;
        const indexY = index.y * canvas.height;

        // Add index finger position to trail only when drawing
        addIndexPoint(indexX, indexY);

        drawHand(ctx, landmarks, canvas);
        }

        updateAndDraw(ctx);

        ctx.restore();
      });

      const camera = new Camera(videoRef.current!, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! });
        },
        // Mobile optimized resolution
        width: Math.min(window.innerWidth, isMobile ? 1280 : window.innerWidth),
        height: Math.min(window.innerHeight, isMobile ? 720 : window.innerHeight),
      });

      camera.start();
    };

    initializeHandTracking();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('orientationchange', updateCanvasSize);
    };
  }, []);

  return { videoRef, canvasRef, clearTrail };
}

// 🖐️ Draw Hand Skeleton
function drawHand(ctx: CanvasRenderingContext2D, landmarks: any, canvas: HTMLCanvasElement) {
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8], // Index finger
    [5, 9], [9, 10], [10, 11], [11, 12], // Middle finger
    [9, 13], [13, 14], [14, 15], [15, 16], // Ring finger
    [13, 17], [17, 18], [18, 19], [19, 20], // Pinky
    [0, 17] // Palm
  ];

  // 🌟 Add shadow effect for depth
  ctx.shadowBlur = 15;
  ctx.shadowColor = "rgba(0, 255, 255, 0.8)";
  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 4;
  
  connections.forEach(([start, end]) => {
    const startPoint = landmarks[start];
    const endPoint = landmarks[end];
    if (startPoint && endPoint) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x * canvas.width, startPoint.y * canvas.height);
      ctx.lineTo(endPoint.x * canvas.width, endPoint.y * canvas.height);
      ctx.stroke();
    }
  });

  // Reset shadow for dots
  ctx.shadowBlur = 4;
  ctx.shadowColor = "rgba(0, 255, 255, 0.3)";
  
  // Draw all landmarks as dots with increased radius
  landmarks.forEach((point: any) => {
    ctx.beginPath();
    ctx.arc(point.x * canvas.width, point.y * canvas.height, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "cyan";
    ctx.fill();
  });
  
  // Highlight index finger (landmark 8) with enhanced shadow
  const indexLandmark = landmarks[8];
  if (indexLandmark) {
    ctx.shadowBlur = 12;
    ctx.shadowColor = "rgba(255, 255, 0, 0.6)";
    ctx.beginPath();
    ctx.arc(indexLandmark.x * canvas.width, indexLandmark.y * canvas.height, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
  }
  
  // Reset shadow for next frame
  ctx.shadowBlur = 0;
}

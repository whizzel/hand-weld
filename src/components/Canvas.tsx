'use client';

import { useHandTracking } from '@/hooks/useHandTracking';

export default function Canvas() {
  const { videoRef, canvasRef } = useHandTracking();

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

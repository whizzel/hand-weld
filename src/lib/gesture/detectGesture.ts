import type { Landmark } from '@/types';

export function shouldDraw(landmarks: Landmark[]): boolean {
  // Finger tips
  const indexTip = landmarks[8];
  const indexPip = landmarks[6];

  const middleTip = landmarks[12];
  const middlePip = landmarks[10];

  const ringTip = landmarks[16];
  const ringPip = landmarks[14];

  const pinkyTip = landmarks[20];
  const pinkyPip = landmarks[18];

  const thumbTip = landmarks[4];
  const thumbIp = landmarks[3];

  //jugad of fingers 
  const indexOpen = indexTip.y < indexPip.y;

  const middleClosed = middleTip.y > middlePip.y;
  const ringClosed = ringTip.y > ringPip.y;
  const pinkyClosed = pinkyTip.y > pinkyPip.y;
  const thumbClosed = thumbTip.x < thumbIp.x; // thumb special case

  const isWriting =
    indexOpen &&
    middleClosed &&
    ringClosed &&
    pinkyClosed &&
    thumbClosed;

  return isWriting;
}

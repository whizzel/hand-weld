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
  const wrist = landmarks[0];

  // Simple and reliable left/right hand detection
  // In mirrored view, left hand appears on right side and vice versa
  const isLeftHand = thumbTip.x > pinkyTip.x; // Reversed due to mirroring
  
  // Simple finger detection
  const indexOpen = indexTip.y < indexPip.y;
  const middleClosed = middleTip.y > middlePip.y;
  const ringClosed = ringTip.y > ringPip.y;
  const pinkyClosed = pinkyTip.y > pinkyPip.y;
  
  // Simplified thumb detection for mirrored view
  // Due to mirroring, left hand thumb points left (negative direction)
  const thumbClosed = isLeftHand ? 
    thumbTip.x < thumbIp.x :  // Left hand (appears right in mirror)
    thumbTip.x > thumbIp.x;   // Right hand (appears left in mirror)

  const isWriting =
    indexOpen &&
    middleClosed &&
    ringClosed &&
    pinkyClosed &&
    thumbClosed;

  return isWriting;
}

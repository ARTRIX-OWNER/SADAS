export interface TiltCalculationResult {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  glareOpacity: number;
}

export function calculateTilt(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxAngle: number = 14
): TiltCalculationResult {
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Normalized offsets between -1 and 1
  const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
  const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

  // RotateX rotates along horizontal axis (moving mouse up tilts top away, i.e. negative rotateX)
  const rotateX = Number((-normY * maxAngle).toFixed(2));
  const rotateY = Number((normX * maxAngle).toFixed(2));

  // Glare position in percentages
  const glareX = Number(((x / rect.width) * 100).toFixed(1));
  const glareY = Number(((y / rect.height) * 100).toFixed(1));

  return {
    rotateX,
    rotateY,
    glareX,
    glareY,
    glareOpacity: 0.85,
  };
}

export function getResetTilt(): TiltCalculationResult {
  return {
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  };
}

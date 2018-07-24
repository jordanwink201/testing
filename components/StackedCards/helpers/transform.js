export const setTransform = (
  element,
  elScale = 1,
  elTransX = 0,
  elTransY = 0,
  elTransZ = 0,
  rotate = 0,
) => {
  $(element).css(
    'transform',
    `scale(${elScale}) translateX(${elTransX}px) translateY(${elTransY}px) translateZ(${elTransZ}px) rotate(${rotate}deg)`,
  )
}

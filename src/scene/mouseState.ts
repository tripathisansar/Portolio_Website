export const mouseState = { x: 0, y: 0 }

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouseState.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouseState.y = -(e.clientY / window.innerHeight - 0.5) * 2
  })
}

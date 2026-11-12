import { motion, useReducedMotion } from 'framer-motion'

const ambientGlows = [
  {
    className: 'ambient-glow--north',
    duration: 16,
    restOpacity: 0.54,
    keyframes: {
      x: [0, 120, -100, 0],
      y: [0, 90, 135, 0],
      scale: [1, 1.14, 0.88, 1],
      opacity: [0.54, 0.74, 0.6, 0.54],
    },
  },
  {
    className: 'ambient-glow--east',
    duration: 23,
    restOpacity: 0.46,
    keyframes: {
      x: [0, -130, 105, 0],
      y: [0, 110, -95, 0],
      scale: [1, 0.88, 1.16, 1],
      opacity: [0.46, 0.64, 0.52, 0.46],
    },
  },
  {
    className: 'ambient-glow--south',
    duration: 21,
    restOpacity: 0.38,
    keyframes: {
      x: [0, 105, -135, 0],
      y: [0, -110, 90, 0],
      scale: [1, 1.16, 0.89, 1],
      opacity: [0.38, 0.58, 0.45, 0.38],
    },
  },
]

export function AmbientBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {ambientGlows.map((glow) => (
        <motion.div
          key={glow.className}
          className={`ambient-glow ${glow.className} will-change-transform`}
          initial={false}
          animate={
            shouldReduceMotion
              ? { x: 0, y: 0, scale: 1, opacity: glow.restOpacity }
              : glow.keyframes
          }
          transition={{
            duration: shouldReduceMotion ? 0 : glow.duration,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

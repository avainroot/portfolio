import { motion, useReducedMotion } from 'framer-motion'

const ambientGlows = [
  {
    className: 'ambient-glow--north',
    duration: 20,
    restOpacity: 0.72,
    keyframes: {
      x: [0, 150, -95, 0],
      y: [0, 95, 140, 0],
      scale: [1, 1.12, 0.9, 1],
      opacity: [0.72, 0.92, 0.78, 0.72],
    },
  },
  {
    className: 'ambient-glow--east',
    duration: 26,
    restOpacity: 0.61,
    keyframes: {
      x: [0, -145, 95, 0],
      y: [0, 115, -90, 0],
      scale: [1, 0.9, 1.13, 1],
      opacity: [0.61, 0.82, 0.72, 0.61],
    },
  },
  {
    className: 'ambient-glow--south',
    duration: 23,
    restOpacity: 0.54,
    keyframes: {
      x: [0, 125, -150, 0],
      y: [0, -115, 85, 0],
      scale: [1, 1.13, 0.91, 1],
      opacity: [0.54, 0.76, 0.64, 0.54],
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

import { useEffect, useRef } from 'react'

interface AmbientGlow {
  centerX: number
  centerY: number
  radiusFactor: number
  maxRadius: number
  amplitudeX: number
  amplitudeY: number
  duration: number
  innerColor: string
  middleColor: string
}

const ambientGlows: AmbientGlow[] = [
  {
    centerX: 0.14,
    centerY: 0.28,
    radiusFactor: 0.52,
    maxRadius: 400,
    amplitudeX: 70,
    amplitudeY: 58,
    duration: 20,
    innerColor: 'rgba(120, 183, 245, 0.17)',
    middleColor: 'rgba(120, 183, 245, 0.08)',
  },
  {
    centerX: 0.95,
    centerY: 0.6,
    radiusFactor: 0.46,
    maxRadius: 350,
    amplitudeX: 66,
    amplitudeY: 52,
    duration: 26,
    innerColor: 'rgba(107, 166, 230, 0.13)',
    middleColor: 'rgba(107, 166, 230, 0.06)',
  },
  {
    centerX: 0.52,
    centerY: 0.94,
    radiusFactor: 0.42,
    maxRadius: 320,
    amplitudeX: 68,
    amplitudeY: 50,
    duration: 23,
    innerColor: 'rgba(120, 183, 245, 0.1)',
    middleColor: 'rgba(120, 183, 245, 0.04)',
  },
]

const targetFrameInterval = 1000 / 24

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })

    if (!canvas || !context) {
      console.error('Unable to initialize the ambient canvas.')
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let viewportWidth = 1
    let viewportHeight = 1
    let frameId: number | null = null
    let lastFrameTime = 0

    const draw = (time: number) => {
      context.clearRect(0, 0, viewportWidth, viewportHeight)

      for (const glow of ambientGlows) {
        const phase = (time / glow.duration) * Math.PI * 2
        const centerX = viewportWidth * glow.centerX + Math.sin(phase) * glow.amplitudeX
        const centerY = viewportHeight * glow.centerY + Math.cos(phase) * glow.amplitudeY
        const radius = Math.max(120, Math.min(viewportWidth * glow.radiusFactor, glow.maxRadius))
        const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)

        gradient.addColorStop(0, glow.innerColor)
        gradient.addColorStop(0.53, glow.middleColor)
        gradient.addColorStop(1, 'rgba(120, 183, 245, 0)')

        context.fillStyle = gradient
        context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2)
      }
    }

    const render = (timestamp: number) => {
      if (timestamp - lastFrameTime >= targetFrameInterval) {
        draw(timestamp / 1000)
        lastFrameTime = timestamp
      }

      frameId = window.requestAnimationFrame(render)
    }

    const stop = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      }
    }

    const syncAnimation = () => {
      stop()

      if (reducedMotion.matches || document.hidden) {
        draw(0)
        return
      }

      lastFrameTime = 0
      frameId = window.requestAnimationFrame(render)
    }

    const resizeCanvas = () => {
      viewportWidth = Math.max(1, window.innerWidth)
      viewportHeight = Math.max(1, window.innerHeight)

      const resolution = Math.min(
        window.devicePixelRatio || 1,
        1,
        1600 / viewportWidth,
        1000 / viewportHeight,
      )

      canvas.width = Math.max(1, Math.round(viewportWidth * resolution))
      canvas.height = Math.max(1, Math.round(viewportHeight * resolution))
      context.setTransform(resolution, 0, 0, resolution, 0, 0)
      draw(reducedMotion.matches || document.hidden ? 0 : performance.now() / 1000)
    }

    window.addEventListener('resize', resizeCanvas, { passive: true })
    document.addEventListener('visibilitychange', syncAnimation)
    reducedMotion.addEventListener('change', syncAnimation)
    resizeCanvas()
    syncAnimation()

    return () => {
      stop()
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('visibilitychange', syncAnimation)
      reducedMotion.removeEventListener('change', syncAnimation)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}

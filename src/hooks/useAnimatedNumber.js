import { useEffect, useState } from 'react'
import { animate, useMotionValue, useMotionValueEvent } from 'framer-motion'

export const useAnimatedNumber = (value) => {
  const motionValue = useMotionValue(0)
  const [animatedValue, setAnimatedValue] = useState(0)

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setAnimatedValue(Math.round(latest))
  })

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.9,
      ease: 'easeOut',
    })

    return () => controls.stop()
  }, [motionValue, value])

  return animatedValue
}

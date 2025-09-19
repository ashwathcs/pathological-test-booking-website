import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useInView } from "framer-motion"
import { useEffect, useRef } from "react"

interface CountUpProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  className?: string
}

export function CountUp({ from, to, duration = 2, suffix = "", className = "" }: CountUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration })
      return controls.stop
    }
  }, [count, to, duration, isInView])

  return (
    <motion.span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  )
}
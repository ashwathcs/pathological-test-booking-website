import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeInUp({ children, delay = 0, duration = 0.6, className = "" }: FadeInUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.21, 1.11, 0.81, 0.99]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
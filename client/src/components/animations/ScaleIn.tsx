import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface ScaleInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, duration = 0.5, className = "" }: ScaleInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
import { motion } from "framer-motion"

interface FloatingIconProps {
  children: React.ReactNode
  className?: string
}

export function FloatingIcon({ children, className = "" }: FloatingIconProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
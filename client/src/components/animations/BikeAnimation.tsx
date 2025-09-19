import { motion, useReducedMotion } from "framer-motion"

export function BikeAnimation() {
  const shouldReduceMotion = useReducedMotion()

  const primaryMotion = shouldReduceMotion ? {} : {
    x: [0, 400, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const wheelRotation = shouldReduceMotion ? {} : {
    rotate: 360,
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "linear"
    }
  }

  const subtleBob = shouldReduceMotion ? {} : {
    y: [0, -3, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-b from-accent/20 to-background rounded-lg border">
      {/* Main animation container */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 500 300" className="w-full h-full" aria-hidden="true">
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="[stop-color:hsl(var(--muted))]" />
              <stop offset="100%" className="[stop-color:hsl(var(--muted-foreground))]" />
            </linearGradient>
          </defs>
          
          {/* Simple road */}
          <ellipse cx="250" cy="280" rx="250" ry="30" fill="url(#roadGradient)" opacity="0.3" />
          
          {/* Simple background buildings */}
          <g opacity="0.2" className="fill-muted-foreground">
            <rect x="50" y="150" width="40" height="80" />
            <rect x="120" y="140" width="50" height="90" />
            <rect x="200" y="160" width="35" height="70" />
            <rect x="300" y="145" width="45" height="85" />
            <rect x="380" y="155" width="40" height="75" />
          </g>
          
          {/* Lab Technician on Bike */}
          <motion.g
            animate={primaryMotion}
            initial={{ x: -50 }}
          >
            {/* Bike Shadow */}
            <ellipse cx="90" cy="260" rx="20" ry="4" fill="hsl(var(--muted-foreground))" opacity="0.2" />
            
            {/* Bike */}
            <g>
              {/* Back wheel */}
              <motion.circle
                cx="60"
                cy="240"
                r="18"
                fill="none"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="4"
                animate={wheelRotation}
                style={{ transformOrigin: "60px 240px" }}
              />
              <circle cx="60" cy="240" r="10" fill="hsl(var(--muted-foreground))" />
              
              {/* Front wheel */}
              <motion.circle
                cx="120"
                cy="240"
                r="18"
                fill="none"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="4"
                animate={wheelRotation}
                style={{ transformOrigin: "120px 240px" }}
              />
              <circle cx="120" cy="240" r="10" fill="hsl(var(--muted-foreground))" />
              
              {/* Bike frame */}
              <path
                d="M60 240 L90 210 L120 240 L90 210 L80 190"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Seat */}
              <rect x="75" y="205" width="15" height="6" rx="3" fill="hsl(var(--muted-foreground))" />
              
              {/* Sample collection box */}
              <rect x="45" y="220" width="20" height="15" rx="2" fill="hsl(var(--primary))" />
              <rect x="47" y="222" width="16" height="11" rx="1" fill="hsl(var(--primary-foreground))" />
              
              {/* Medical cross on box */}
              <rect x="52" y="224" width="1.5" height="7" fill="hsl(var(--destructive))" />
              <rect x="50" y="226.5" width="6" height="1.5" fill="hsl(var(--destructive))" />
              
              {/* LAB text */}
              <text x="55" y="230" fontSize="4" fill="hsl(var(--destructive))" textAnchor="middle" fontWeight="bold">LAB</text>
            </g>
            
            {/* Lab Technician with subtle animation */}
            <motion.g animate={subtleBob}>
              {/* Body */}
              <rect x="80" y="190" width="12" height="20" rx="6" fill="hsl(var(--primary))" />
              
              {/* Lab coat */}
              <rect x="78" y="188" width="16" height="24" rx="8" fill="hsl(var(--background))" opacity="0.9" />
              
              {/* Head */}
              <circle cx="86" cy="180" r="9" fill="hsl(var(--muted))" />
              
              {/* Hair */}
              <path
                d="M77 175 Q86 170 95 175 Q91 172 86 172 Q81 172 77 175"
                fill="hsl(var(--muted-foreground))"
              />
              
              {/* Simple face */}
              <circle cx="83" cy="178" r="0.8" fill="hsl(var(--foreground))" />
              <circle cx="89" cy="178" r="0.8" fill="hsl(var(--foreground))" />
              <path d="M84 182 Q86 183 88 182" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.4" />
              
              {/* Arms - simplified */}
              <rect x="75" y="195" width="3" height="12" rx="1.5" fill="hsl(var(--muted))" />
              <rect x="92" y="195" width="3" height="12" rx="1.5" fill="hsl(var(--muted))" />
              
              {/* Safety helmet */}
              <ellipse cx="86" cy="174" rx="10" ry="7" fill="hsl(var(--primary))" opacity="0.8" />
              <rect x="80" y="172" width="12" height="2" rx="1" fill="hsl(var(--primary-foreground))" />
            </motion.g>
          </motion.g>
          
          {/* Single floating medical icon */}
          <motion.g
            animate={shouldReduceMotion ? {} : { 
              y: [0, -8, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <g transform="translate(350, 120)">
              <rect x="0" y="4" width="16" height="3" fill="hsl(var(--primary))" opacity="0.6" />
              <rect x="6.5" y="-2" width="3" height="16" fill="hsl(var(--primary))" opacity="0.6" />
            </g>
          </motion.g>
        </svg>
      </div>
      
      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center bg-background/80 backdrop-blur-sm rounded-lg p-4 mx-4"
        >
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            Home Sample Collection
          </h3>
          <p className="text-sm text-muted-foreground">
            Our certified technicians come to your doorstep
          </p>
        </motion.div>
      </div>
    </div>
  )
}
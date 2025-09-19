import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FadeInUp } from "@/components/animations/FadeInUp"
import { StaggerContainer } from "@/components/animations/StaggerContainer"
import { StaggerItem } from "@/components/animations/StaggerItem"
import { CountUp } from "@/components/animations/CountUp"
import { BikeAnimation } from "@/components/animations/BikeAnimation"
import heroImage from "@assets/generated_images/Modern_medical_laboratory_hero_62d380d4.png"

export function Hero() {
  const features = [ //todo: remove mock functionality
    "Home sample collection",
    "Digital reports in 24-48 hours",
    "NABL accredited labs",
    "Expert phlebotomists"
  ]

  const stats = [
    { value: 50000, label: "Satisfied Customers", suffix: "+" },
    { value: 25, label: "Cities Covered", suffix: "+" },
    { value: 200, label: "Tests Available", suffix: "+" }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20">
      {/* Background Image with Overlay */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src={heroImage}
          alt="Modern medical laboratory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </motion.div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <FadeInUp>
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Professional
                  </motion.span>
                  <motion.span 
                    className="text-primary block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Pathological Tests
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    at Your Doorstep
                  </motion.span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-lg text-muted-foreground max-w-lg"
                >
                  Book lab tests online with home sample collection. Get accurate results from NABL accredited laboratories with digital reports delivered securely.
                </motion.p>
              </div>

              {/* Features List */}
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" staggerDelay={0.1}>
                {features.map((feature, index) => (
                  <StaggerItem key={index}>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="h-5 w-5 text-chart-2 flex-shrink-0" />
                      </motion.div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button size="lg" className="text-base" data-testid="button-book-test">
                    Book Test Now
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button variant="outline" size="lg" className="text-base bg-background/80 backdrop-blur-sm" data-testid="button-view-tests">
                    View All Tests
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <StaggerContainer className="flex items-center space-x-8 pt-4" staggerDelay={0.2}>
                {stats.map((stat, index) => (
                  <StaggerItem key={index}>
                    <motion.div 
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-foreground" data-testid={`text-${stat.label.toLowerCase().replace(' ', '-')}`}>
                        <CountUp 
                          from={0} 
                          to={stat.value} 
                          duration={2 + index * 0.2}
                          suffix={stat.suffix}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeInUp>
          
          {/* Bike Animation Section */}
          <div className="lg:col-span-1">
            <FadeInUp delay={0.5}>
              <BikeAnimation />
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FadeInUp } from "@/components/animations/FadeInUp"
import { ScaleIn } from "@/components/animations/ScaleIn"
import { StaggerContainer } from "@/components/animations/StaggerContainer"
import { StaggerItem } from "@/components/animations/StaggerItem"
import { FloatingIcon } from "@/components/animations/FloatingIcon"
import { CountUp } from "@/components/animations/CountUp"
import { PageTransition } from "@/components/animations/PageTransition"
import heroImage from "@assets/generated_images/Modern_medical_laboratory_hero_62d380d4.png"

export default function Landing() {
  const features = [
    "Home sample collection",
    "Digital reports in 24-48 hours",
    "NABL accredited labs",
    "Expert phlebotomists"
  ]

  const stats = [
    { value: 25, label: "Cities Covered", suffix: "+" },
    { value: 200, label: "Tests Available", suffix: "+" },
    { value: 99.9, label: "Accuracy Rate", suffix: "%" }
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="container flex h-16 items-center justify-between px-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">Pathocare360</span>
            </motion.div>
            
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" asChild data-testid="button-learn-more">
                  <a href="#features">Learn More</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild data-testid="button-get-started">
                  <a href="/api/login">Get Started</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20 py-20 lg:py-32">
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

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl space-y-8">
              <FadeInUp delay={0.3}>
                <div className="space-y-6">
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      Professional
                    </motion.span>
                    <motion.span 
                      className="text-primary block"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      Pathological Tests
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      at Your Doorstep
                    </motion.span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="text-lg text-muted-foreground max-w-2xl"
                  >
                    Book lab tests online with home sample collection. Get accurate results from NABL accredited laboratories with digital reports delivered securely.
                  </motion.p>
                </div>
              </FadeInUp>

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
              <FadeInUp delay={1.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button size="lg" className="text-base" asChild data-testid="button-book-now">
                      <a href="/api/login">
                        Book Test Now
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.div>
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button variant="outline" size="lg" className="text-base bg-background/80 backdrop-blur-sm" asChild data-testid="button-view-tests">
                      <a href="#tests">View All Tests</a>
                    </Button>
                  </motion.div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.2}>
              {stats.map((stat, index) => (
                <StaggerItem key={index}>
                  <ScaleIn delay={index * 0.1}>
                    <motion.div 
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-primary" data-testid={`stat-value-${index}`}>
                        <CountUp 
                          from={0} 
                          to={stat.value} 
                          duration={2 + index * 0.2}
                          suffix={stat.suffix}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  </ScaleIn>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Home Sample Collection</li>
                <li>Digital Reports</li>
                <li>Online Booking</li>
                <li>Order Tracking</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Phone: +91-1800-123-4567</p>
                <p>Email: support@pathocare360.com</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Pathocare360. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </PageTransition>
  )
}
import { ArrowRight, Shield, Clock, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import heroImage from "@assets/generated_images/Modern_medical_laboratory_hero_62d380d4.png"

export default function Landing() {
  const features = [
    "Home sample collection",
    "Digital reports in 24-48 hours",
    "NABL accredited labs",
    "Expert phlebotomists"
  ]

  const stats = [
    { value: "50,000+", label: "Satisfied Customers" },
    { value: "25+", label: "Cities Covered" },
    { value: "200+", label: "Tests Available" },
    { value: "99.9%", label: "Accuracy Rate" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">MedTest Pro</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild data-testid="button-learn-more">
              <a href="#features">Learn More</a>
            </Button>
            <Button asChild data-testid="button-get-started">
              <a href="/api/login">Get Started</a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20 py-20 lg:py-32">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={heroImage}
              alt="Modern medical laboratory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Professional
                  <span className="text-primary block">Pathological Tests</span>
                  at Your Doorstep
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Book lab tests online with home sample collection. Get accurate results from NABL accredited laboratories with digital reports delivered securely.
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-chart-2 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base" asChild data-testid="button-book-now">
                  <a href="/api/login">
                    Book Test Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="text-base bg-background/80 backdrop-blur-sm" asChild data-testid="button-view-tests">
                  <a href="#tests">View All Tests</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary" data-testid={`stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold text-foreground">Why Choose MedTest Pro?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine cutting-edge technology with expert medical professionals to deliver accurate, convenient, and reliable pathological testing services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover-elevate">
                <CardContent className="p-8">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Quick & Convenient</h3>
                  <p className="text-muted-foreground">
                    Home sample collection at your preferred time. No need to visit labs or wait in queues.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover-elevate">
                <CardContent className="p-8">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">NABL Certified</h3>
                  <p className="text-muted-foreground">
                    All tests processed in NABL accredited laboratories with highest quality standards.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover-elevate">
                <CardContent className="p-8">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your health data is encrypted and protected with enterprise-grade security measures.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6 text-primary-foreground">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg opacity-90">
                Join thousands of satisfied customers who trust us with their health. Book your test today and experience the convenience of professional pathological services.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild data-testid="button-join-now">
                <a href="/api/login">
                  Join Now - It's Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">MedTest Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional pathological testing services with home sample collection and digital reports.
              </p>
            </div>
            
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
              <h4 className="font-medium text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Track Order</li>
                <li>Download Reports</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Phone: +91-1800-123-4567</p>
                <p>Email: support@medtestpro.com</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MedTest Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import heroImage from "@assets/generated_images/Modern_medical_laboratory_hero_62d380d4.png"

export function Hero() {
  const features = [ //todo: remove mock functionality
    "Home sample collection",
    "Digital reports in 24-48 hours",
    "NABL accredited labs",
    "Expert phlebotomists"
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Modern medical laboratory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Professional
                <span className="text-primary block">Pathological Tests</span>
                at Your Doorstep
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
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
              <Button size="lg" className="text-base" data-testid="button-book-test">
                Book Test Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-base bg-background/80 backdrop-blur-sm" data-testid="button-view-tests">
                View All Tests
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground" data-testid="text-satisfied-customers">50,000+</div>
                <div className="text-sm text-muted-foreground">Satisfied Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground" data-testid="text-cities-covered">25+</div>
                <div className="text-sm text-muted-foreground">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground" data-testid="text-tests-available">200+</div>
                <div className="text-sm text-muted-foreground">Tests Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
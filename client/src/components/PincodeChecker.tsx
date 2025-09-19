import { useState } from "react"
import { MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ServiceStatus = {
  available: boolean
  message: string
  estimatedTime?: string
  charges?: string
}

export function PincodeChecker() {
  const [pincode, setPincode] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(null)

  // Mock service areas //todo: remove mock functionality
  const servicePincodes = ["110001", "400001", "560001", "600001", "700001", "500001", "380001", "411001"]

  const checkServiceability = async () => {
    if (!pincode || pincode.length !== 6) return

    setIsChecking(true)
    setServiceStatus(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const isServicable = servicePincodes.includes(pincode)
    
    setServiceStatus({
      available: isServicable,
      message: isServicable 
        ? "Great! Home collection available in your area."
        : "Sorry, we don't provide service in this area yet. We're expanding soon!",
      estimatedTime: isServicable ? "Same day collection" : undefined,
      charges: isServicable ? "Free collection above ₹500" : undefined
    })
    
    setIsChecking(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    checkServiceability()
  }

  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-foreground">Check Service Availability</h2>
          <p className="text-muted-foreground">Enter your pincode to confirm home collection service in your area</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your pincode (e.g., 110001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-10"
                    data-testid="input-pincode"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isChecking || pincode.length !== 6}
                  data-testid="button-check-pincode"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Check"
                  )}
                </Button>
              </div>

              {/* Popular Pincodes */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Popular areas:</p>
                <div className="flex flex-wrap gap-2">
                  {servicePincodes.slice(0, 4).map((code) => (
                    <Badge 
                      key={code}
                      variant="secondary" 
                      className="cursor-pointer hover-elevate"
                      onClick={() => setPincode(code)}
                      data-testid={`badge-pincode-${code}`}
                    >
                      {code}
                    </Badge>
                  ))}
                </div>
              </div>
            </form>

            {/* Results */}
            {serviceStatus && (
              <div className="mt-6 p-4 rounded-lg border">
                <div className="flex items-start space-x-3">
                  {serviceStatus.available ? (
                    <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-2">
                    <p className="font-medium text-foreground" data-testid="text-service-status">
                      {serviceStatus.message}
                    </p>
                    {serviceStatus.estimatedTime && (
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" data-testid="badge-estimated-time">
                          {serviceStatus.estimatedTime}
                        </Badge>
                        {serviceStatus.charges && (
                          <Badge variant="outline" data-testid="badge-charges">
                            {serviceStatus.charges}
                          </Badge>
                        )}
                      </div>
                    )}
                    {serviceStatus.available && (
                      <Button className="mt-3" data-testid="button-book-now">
                        Book Test Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
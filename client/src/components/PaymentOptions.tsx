import { useState } from "react"
import { CreditCard, Clock, CheckCircle, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type PaymentMethod = "prepaid" | "postpaid"

export function PaymentOptions() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("prepaid")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock order details //todo: remove mock functionality
  const orderTotal = 899
  const discountAmount = 100
  const finalAmount = orderTotal - discountAmount

  const paymentMethods = [
    {
      id: "prepaid" as PaymentMethod,
      title: "Pay Now (Prepaid)",
      description: "Pay online and save money with exclusive discounts",
      icon: CreditCard,
      benefits: ["10% extra discount", "Priority booking", "Faster processing"],
      discount: 10,
      popular: true
    },
    {
      id: "postpaid" as PaymentMethod, 
      title: "Pay After Collection",
      description: "Pay after sample collection is completed",
      icon: Clock,
      benefits: ["Pay later convenience", "Cash/UPI payment", "No advance payment"],
      discount: 0,
      popular: false
    }
  ]

  const handlePayment = async () => {
    setIsProcessing(true)
    console.log('Processing payment with method:', selectedMethod)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    alert(`${selectedMethod === 'prepaid' ? 'Payment successful!' : 'Booking confirmed! You can pay after collection.'}`)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-foreground">Choose Payment Option</h2>
          <p className="text-muted-foreground">Select your preferred payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <RadioGroup 
              value={selectedMethod} 
              onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}
              className="space-y-4"
            >
              {paymentMethods.map((method) => {
                const Icon = method.icon
                return (
                  <Card 
                    key={method.id}
                    className={`cursor-pointer transition-all ${
                      selectedMethod === method.id 
                        ? 'ring-2 ring-primary border-primary' 
                        : 'hover-elevate'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                    data-testid={`card-payment-${method.id}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem 
                            value={method.id} 
                            id={method.id}
                            className="mt-0.5"
                            data-testid={`radio-payment-${method.id}`}
                          />
                          <Icon className="h-6 w-6 text-primary" />
                          <div>
                            <Label htmlFor={method.id} className="text-lg font-semibold cursor-pointer">
                              {method.title}
                            </Label>
                            {method.popular && (
                              <Badge variant="destructive" className="ml-2">
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                        {method.discount > 0 && (
                          <Badge variant="outline" className="text-chart-2">
                            {method.discount}% OFF
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        {method.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="ml-6 space-y-2">
                        {method.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-chart-2" />
                            <span className="text-sm text-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </RadioGroup>

            {/* Payment Methods for Prepaid */}
            {selectedMethod === "prepaid" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5" />
                    <span>Payment Methods</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Credit Card", "Debit Card", "UPI", "Net Banking"].map((method) => (
                      <Button
                        key={method}
                        variant="outline"
                        className="h-16 flex flex-col items-center justify-center hover-elevate"
                        data-testid={`button-payment-method-${method.toLowerCase().replace(' ', '-')}`}
                      >
                        <CreditCard className="h-5 w-5 mb-1" />
                        <span className="text-xs">{method}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Test Items */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CBC Test</span>
                    <span className="text-foreground">₹299</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lipid Profile</span>
                    <span className="text-foreground">₹599</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Home Collection</span>
                    <span className="text-chart-2">Free</span>
                  </div>
                </div>

                <hr className="border-border" />

                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground" data-testid="text-subtotal">₹{orderTotal}</span>
                </div>

                {/* Discount */}
                {selectedMethod === "prepaid" && (
                  <div className="flex justify-between text-chart-2">
                    <span>Prepaid Discount</span>
                    <span data-testid="text-discount">-₹{discountAmount}</span>
                  </div>
                )}

                <hr className="border-border" />

                {/* Total */}
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total Amount</span>
                  <span className="text-foreground" data-testid="text-total">
                    ₹{selectedMethod === "prepaid" ? finalAmount : orderTotal}
                  </span>
                </div>

                {selectedMethod === "prepaid" && (
                  <Badge variant="outline" className="w-full justify-center text-chart-2">
                    You Save ₹{discountAmount}
                  </Badge>
                )}

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                  data-testid="button-proceed-payment"
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : selectedMethod === "prepaid" ? (
                    `Pay ₹${finalAmount}`
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>

                {selectedMethod === "postpaid" && (
                  <p className="text-xs text-center text-muted-foreground">
                    Payment will be collected after sample collection
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
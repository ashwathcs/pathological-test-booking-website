import { useState } from "react"
import { Search, MapPin, Clock, CheckCircle, Truck, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

type OrderStatus = "confirmed" | "assigned" | "enroute" | "collected" | "processing" | "completed"

type OrderDetails = {
  id: string
  status: OrderStatus
  patientName: string
  tests: string[]
  scheduledDate: string
  scheduledTime: string
  address: string
  phlebotomist?: {
    name: string
    phone: string
    photo?: string
    rating: number
  }
  timeline: {
    status: OrderStatus
    label: string
    timestamp?: string
    completed: boolean
  }[]
}

export function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState("")
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Mock order data //todo: remove mock functionality
  const mockOrder: OrderDetails = {
    id: "ORD123456",
    status: "enroute",
    patientName: "Sarah Johnson",
    tests: ["Complete Blood Count", "Lipid Profile", "Liver Function Test"],
    scheduledDate: "2024-01-20",
    scheduledTime: "09:00 - 11:00",
    address: "123 Medical Street, Healthcare City, 110001",
    phlebotomist: {
      name: "Dr. Rajesh Kumar",
      phone: "+91-98765-43210",
      rating: 4.8
    },
    timeline: [
      { status: "confirmed", label: "Order Confirmed", timestamp: "10:30 AM", completed: true },
      { status: "assigned", label: "Phlebotomist Assigned", timestamp: "11:15 AM", completed: true },
      { status: "enroute", label: "On the Way", timestamp: "08:45 AM", completed: true },
      { status: "collected", label: "Sample Collected", completed: false },
      { status: "processing", label: "Lab Processing", completed: false },
      { status: "completed", label: "Report Ready", completed: false }
    ]
  }

  const searchOrder = async () => {
    if (!orderNumber.trim()) return
    
    setIsSearching(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setOrderDetails(mockOrder)
    setIsSearching(false)
  }

  const getStatusProgress = (status: OrderStatus): number => {
    const statusMap = {
      confirmed: 16.67,
      assigned: 33.33,
      enroute: 50,
      collected: 66.67,
      processing: 83.33,
      completed: 100
    }
    return statusMap[status] || 0
  }

  const getStatusColor = (status: OrderStatus): string => {
    const colorMap = {
      confirmed: "bg-blue-500",
      assigned: "bg-yellow-500", 
      enroute: "bg-orange-500",
      collected: "bg-green-500",
      processing: "bg-purple-500",
      completed: "bg-green-600"
    }
    return colorMap[status] || "bg-gray-500"
  }

  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-foreground">Track Your Order</h2>
          <p className="text-muted-foreground">Enter your order number to track sample collection status</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Enter order number (e.g., ORD123456)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                  className="pl-10"
                  data-testid="input-order-number"
                />
              </div>
              <Button 
                onClick={searchOrder}
                disabled={isSearching || !orderNumber.trim()}
                data-testid="button-track-order"
              >
                {isSearching ? "Searching..." : "Track Order"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {orderDetails && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span>Order #{orderDetails.id}</span>
                    <Badge variant="outline" data-testid="badge-order-status">
                      {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
                    </Badge>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Patient Details</h4>
                    <p className="text-muted-foreground" data-testid="text-patient-name">{orderDetails.patientName}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground" data-testid="text-address">
                        {orderDetails.address}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Scheduled Time</h4>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-muted-foreground" data-testid="text-scheduled-time">
                        {orderDetails.scheduledDate} | {orderDetails.scheduledTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Tests Booked</h4>
                  <div className="flex flex-wrap gap-2">
                    {orderDetails.tests.map((test, index) => (
                      <Badge key={index} variant="secondary" data-testid={`badge-test-${index}`}>
                        {test}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(getStatusProgress(orderDetails.status))}%
                    </span>
                  </div>
                  <Progress 
                    value={getStatusProgress(orderDetails.status)} 
                    className="w-full"
                    data-testid="progress-order-status"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Phlebotomist Details */}
            {orderDetails.phlebotomist && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Assigned Phlebotomist</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">
                        {orderDetails.phlebotomist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground" data-testid="text-phlebotomist-name">
                        {orderDetails.phlebotomist.name}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-muted-foreground">Rating:</span>
                          <span className="text-sm font-medium text-foreground" data-testid="text-phlebotomist-rating">
                            {orderDetails.phlebotomist.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`tel:${orderDetails.phlebotomist?.phone}`)}
                      data-testid="button-call-phlebotomist"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderDetails.timeline.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-chart-2' : 'bg-muted'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${
                            step.completed ? 'text-foreground' : 'text-muted-foreground'
                          }`} data-testid={`text-timeline-${step.status}`}>
                            {step.label}
                          </h4>
                          {step.timestamp && (
                            <span className="text-sm text-muted-foreground" data-testid={`text-timestamp-${step.status}`}>
                              {step.timestamp}
                            </span>
                          )}
                        </div>
                        {index < orderDetails.timeline.length - 1 && (
                          <div className={`w-0.5 h-6 ml-4 ${
                            step.completed ? 'bg-chart-2' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Location (if en route) */}
            {orderDetails.status === "enroute" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Live Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-accent/30 rounded-lg p-4 text-center">
                    <p className="text-foreground font-medium mb-2">Phlebotomist is on the way!</p>
                    <p className="text-sm text-muted-foreground">
                      Estimated arrival: <span className="font-medium text-foreground">10:30 AM</span>
                    </p>
                    <div className="mt-4">
                      <Badge variant="outline" className="text-orange-600">
                        ETA: 15 minutes
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Demo Order */}
        {!orderDetails && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Try tracking with demo order number: <strong>ORD123456</strong>
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setOrderNumber("ORD123456")
                  setOrderDetails(mockOrder)
                }}
                data-testid="button-demo-order"
              >
                View Demo Order
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
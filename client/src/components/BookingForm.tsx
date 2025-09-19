import { useState } from "react"
import { Calendar, Clock, MapPin, User, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

type BookingData = {
  patientName: string
  age: string
  gender: string
  phone: string
  email: string
  address: string
  selectedDate: Date | undefined
  selectedTimeSlot: string
  specialInstructions: string
}

export function BookingForm() {
  const [bookingData, setBookingData] = useState<BookingData>({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    selectedDate: undefined,
    selectedTimeSlot: "",
    specialInstructions: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock available time slots //todo: remove mock functionality
  const timeSlots = [
    "07:00 - 09:00",
    "09:00 - 11:00", 
    "11:00 - 13:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', bookingData)
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    alert('Booking confirmed! You will receive a confirmation SMS shortly.')
  }

  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-foreground">Book Home Collection</h2>
          <p className="text-muted-foreground">Schedule your test with our expert phlebotomists</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Full Name *</Label>
                <Input
                  id="patientName"
                  value={bookingData.patientName}
                  onChange={(e) => updateBookingData('patientName', e.target.value)}
                  placeholder="Enter patient name"
                  required
                  data-testid="input-patient-name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={bookingData.age}
                  onChange={(e) => updateBookingData('age', e.target.value)}
                  placeholder="Enter age"
                  required
                  data-testid="input-age"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select 
                  value={bookingData.gender} 
                  onValueChange={(value) => updateBookingData('gender', value)}
                >
                  <SelectTrigger data-testid="select-gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => updateBookingData('phone', e.target.value)}
                    placeholder="Enter phone number"
                    className="pl-10"
                    required
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => updateBookingData('email', e.target.value)}
                    placeholder="Enter email address"
                    className="pl-10"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Complete Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={bookingData.address}
                    onChange={(e) => updateBookingData('address', e.target.value)}
                    placeholder="Enter complete address with landmark"
                    className="pl-10 min-h-[80px]"
                    required
                    data-testid="textarea-address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Schedule Collection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Select Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                      data-testid="button-select-date"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {bookingData.selectedDate ? 
                        format(bookingData.selectedDate, "PPP") : 
                        "Pick a date"
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={bookingData.selectedDate}
                      onSelect={(date) => updateBookingData('selectedDate', date)}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2">
                <Label>Select Time Slot *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={bookingData.selectedTimeSlot === slot ? "default" : "outline"}
                      className="justify-center"
                      onClick={() => updateBookingData('selectedTimeSlot', slot)}
                      data-testid={`button-timeslot-${slot.replace(/[^\w]/g, '-')}`}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Collection Info */}
              <div className="p-4 bg-accent/30 rounded-lg space-y-2">
                <h4 className="font-medium text-foreground">Collection Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <Badge variant="outline" className="mb-2">Free Collection</Badge>
                    <p>No collection charges for orders above ₹500</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Expert Phlebotomists</Badge>
                    <p>Trained and certified sample collection staff</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Special Instructions (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={bookingData.specialInstructions}
                onChange={(e) => updateBookingData('specialInstructions', e.target.value)}
                placeholder="Any special instructions for our phlebotomist..."
                className="min-h-[80px]"
                data-testid="textarea-instructions"
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full md:w-auto px-8"
              disabled={isSubmitting}
              data-testid="button-confirm-booking"
            >
              {isSubmitting ? "Confirming..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
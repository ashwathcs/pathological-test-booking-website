import { useState } from "react"
import { User, Phone, Mail, MapPin, Calendar, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type UserData = {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  emergencyContact: string
  medicalHistory: string
}

type OrderHistory = {
  id: string
  date: string
  tests: string[]
  amount: number
  status: "completed" | "processing" | "cancelled"
}

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState<UserData>({ //todo: remove mock functionality
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+91-98765-43210",
    dateOfBirth: "1985-03-15",
    gender: "female",
    address: "123 Medical Street, Healthcare City, Delhi - 110001",
    emergencyContact: "+91-98765-43211",
    medicalHistory: "No known allergies. Previous history of hypertension, currently on medication."
  })

  // Mock order history //todo: remove mock functionality
  const orderHistory: OrderHistory[] = [
    {
      id: "ORD123456",
      date: "2024-01-18",
      tests: ["Complete Blood Count", "Lipid Profile"],
      amount: 799,
      status: "completed"
    },
    {
      id: "ORD123455",
      date: "2024-01-10",
      tests: ["Liver Function Test", "Kidney Function Test"], 
      amount: 1299,
      status: "completed"
    },
    {
      id: "ORD123454",
      date: "2024-01-05",
      tests: ["Thyroid Profile"],
      amount: 599,
      status: "processing"
    }
  ]

  const handleSave = () => {
    console.log('Saving user data:', userData)
    setIsEditing(false)
    // Simulate API call
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original data if needed
  }

  const updateUserData = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }

  const getStatusColor = (status: OrderHistory['status']) => {
    switch (status) {
      case "completed":
        return "bg-chart-2 text-white"
      case "processing":
        return "bg-yellow-500 text-white"
      case "cancelled":
        return "bg-destructive text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-foreground">My Profile</h2>
          <p className="text-muted-foreground">Manage your personal information and view order history</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" data-testid="tab-profile">Profile Information</TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">Order History</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-2xl">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground" data-testid="text-user-name">
                        {userData.name}
                      </h3>
                      <p className="text-muted-foreground" data-testid="text-user-email">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isEditing ? "destructive" : "outline"}
                    onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                    data-testid="button-edit-profile"
                  >
                    {isEditing ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => updateUserData('name', e.target.value)}
                      disabled={!isEditing}
                      data-testid="input-name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => updateUserData('email', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => updateUserData('phone', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="dob"
                        type="date"
                        value={userData.dateOfBirth}
                        onChange={(e) => updateUserData('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                        data-testid="input-dob"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={userData.gender} 
                      onValueChange={(value) => updateUserData('gender', value)}
                      disabled={!isEditing}
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
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="emergency"
                        type="tel"
                        value={userData.emergencyContact}
                        onChange={(e) => updateUserData('emergencyContact', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                        data-testid="input-emergency-contact"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      value={userData.address}
                      onChange={(e) => updateUserData('address', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 min-h-[80px]"
                      data-testid="textarea-address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medical">Medical History</Label>
                  <Textarea
                    id="medical"
                    value={userData.medicalHistory}
                    onChange={(e) => updateUserData('medicalHistory', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Any relevant medical history, allergies, or current medications..."
                    className="min-h-[100px]"
                    data-testid="textarea-medical-history"
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" onClick={handleCancel} data-testid="button-cancel">
                      Cancel
                    </Button>
                    <Button onClick={handleSave} data-testid="button-save">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <Card key={order.id} className="hover-elevate" data-testid={`card-order-${order.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-foreground" data-testid={`text-order-number-${order.id}`}>
                            Order #{order.id}
                          </h4>
                          <Badge 
                            className={getStatusColor(order.status)}
                            data-testid={`badge-order-status-${order.id}`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground" data-testid={`text-order-date-${order.id}`}>
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long', 
                            day: 'numeric'
                          })}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {order.tests.map((test, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              data-testid={`badge-test-${order.id}-${index}`}
                            >
                              {test}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <p className="text-2xl font-bold text-foreground" data-testid={`text-order-amount-${order.id}`}>
                          ₹{order.amount}
                        </p>
                        <div className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            data-testid={`button-view-order-${order.id}`}
                          >
                            View Details
                          </Button>
                          {order.status === "completed" && (
                            <Button 
                              size="sm"
                              data-testid={`button-reorder-${order.id}`}
                            >
                              Reorder
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {orderHistory.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Order History</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't placed any orders yet. Book your first test now!
                  </p>
                  <Button data-testid="button-book-first-test">
                    Book Your First Test
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
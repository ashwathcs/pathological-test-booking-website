import { useState } from "react"
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp, 
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Order = {
  id: string
  patientName: string
  tests: string[]
  status: "pending" | "assigned" | "collected" | "completed"
  amount: number
  scheduledTime: string
  phlebotomist?: string
  area: string
}

type Technician = {
  id: string
  name: string
  status: "available" | "busy" | "offline"
  currentOrders: number
  area: string
  rating: number
}

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  // Mock data //todo: remove mock functionality
  const stats = {
    totalOrders: 1247,
    todayOrders: 45,
    revenue: 156780,
    activeTechnicians: 12
  }

  const recentOrders: Order[] = [
    {
      id: "ORD001",
      patientName: "Sarah Johnson",
      tests: ["CBC", "Lipid Profile"],
      status: "assigned",
      amount: 899,
      scheduledTime: "10:00 AM",
      phlebotomist: "Dr. Raj Kumar",
      area: "Sector 15"
    },
    {
      id: "ORD002", 
      patientName: "Mike Chen",
      tests: ["LFT", "KFT"],
      status: "collected",
      amount: 1299,
      scheduledTime: "11:30 AM",
      phlebotomist: "Dr. Priya Shah",
      area: "Sector 22"
    },
    {
      id: "ORD003",
      patientName: "Emily Davis",
      tests: ["Thyroid Profile"],
      status: "pending",
      amount: 599,
      scheduledTime: "2:00 PM",
      area: "Sector 8"
    }
  ]

  const technicians: Technician[] = [
    {
      id: "T001",
      name: "Dr. Raj Kumar",
      status: "busy",
      currentOrders: 3,
      area: "Sector 15",
      rating: 4.8
    },
    {
      id: "T002", 
      name: "Dr. Priya Shah",
      status: "available",
      currentOrders: 1,
      area: "Sector 22",
      rating: 4.9
    },
    {
      id: "T003",
      name: "Dr. Amit Sharma",
      status: "offline",
      currentOrders: 0,
      area: "Sector 5",
      rating: 4.7
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white"
      case "assigned":
        return "bg-blue-500 text-white"
      case "collected":
        return "bg-green-500 text-white"
      case "completed":
        return "bg-gray-500 text-white"
      case "available":
        return "bg-green-500 text-white"
      case "busy":
        return "bg-orange-500 text-white"
      case "offline":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
          <p className="text-muted-foreground">Monitor orders, manage technicians, and track performance</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="orders" data-testid="tab-orders">Orders</TabsTrigger>
            <TabsTrigger value="technicians" data-testid="tab-technicians">Technicians</TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-orders">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-today-orders">{stats.todayOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    +12 since yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-revenue">₹{stats.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +15.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Technicians</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-active-technicians">{stats.activeTechnicians}</div>
                  <p className="text-xs text-muted-foreground">
                    2 currently on duty
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <p className="font-medium" data-testid={`text-patient-${order.id}`}>{order.patientName}</p>
                          <Badge className={getStatusColor(order.status)} data-testid={`badge-status-${order.id}`}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{order.tests.join(', ')}</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{order.scheduledTime}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{order.area}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium" data-testid={`text-amount-${order.id}`}>₹{order.amount}</p>
                        {order.phlebotomist && (
                          <p className="text-sm text-muted-foreground">{order.phlebotomist}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Tests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.patientName}</TableCell>
                        <TableCell>{order.tests.join(', ')}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{order.amount}</TableCell>
                        <TableCell>{order.phlebotomist || 'Unassigned'}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" data-testid={`button-edit-${order.id}`}>
                              Edit
                            </Button>
                            <Button size="sm" data-testid={`button-assign-${order.id}`}>
                              Assign
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technicians Tab */}
          <TabsContent value="technicians" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technician Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {technicians.map((tech) => (
                    <Card key={tech.id} className="hover-elevate">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium" data-testid={`text-tech-name-${tech.id}`}>{tech.name}</h4>
                            <Badge className={getStatusColor(tech.status)} data-testid={`badge-tech-status-${tech.id}`}>
                              {tech.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex justify-between">
                              <span>Area:</span>
                              <span>{tech.area}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Current Orders:</span>
                              <span>{tech.currentOrders}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Rating:</span>
                              <span>{tech.rating}/5</span>
                            </div>
                          </div>
                          <Button className="w-full" size="sm" data-testid={`button-manage-${tech.id}`}>
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Orders Completed Today</span>
                      <span className="font-medium" data-testid="text-completed-today">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Collection Time</span>
                      <span className="font-medium">45 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer Satisfaction</span>
                      <span className="font-medium text-chart-2">4.6/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Technician Utilization</span>
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">Delayed Collection</p>
                      <p className="text-xs text-muted-foreground">ORD001 is running 30 minutes late</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Collection Completed</p>
                      <p className="text-xs text-muted-foreground">ORD002 successfully collected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
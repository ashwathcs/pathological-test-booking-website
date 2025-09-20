import { useState } from "react"
import { Bell, CheckCircle, Clock, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

type NotificationType = "appointment" | "report" | "payment" | "reminder" | "system"

type Notification = {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([ //todo: remove mock functionality
    {
      id: "1",
      type: "report",
      title: "Test Report Ready",
      message: "Your Complete Blood Count report is now available for download",
      timestamp: "2 hours ago",
      read: false,
      priority: "high"
    },
    {
      id: "2", 
      type: "appointment",
      title: "Appointment Confirmed",
      message: "Your home collection is scheduled for tomorrow at 10:00 AM",
      timestamp: "4 hours ago", 
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      type: "reminder",
      title: "Fasting Reminder",
      message: "Remember to fast for 12 hours before your lipid profile test tomorrow",
      timestamp: "6 hours ago",
      read: true,
      priority: "medium"
    },
    {
      id: "4",
      type: "payment",
      title: "Payment Successful",
      message: "Your payment of ₹899 has been successfully processed",
      timestamp: "1 day ago",
      read: true,
      priority: "low"
    },
    {
      id: "5",
      type: "system",
      title: "Service Update",
      message: "We've expanded our services to 3 new areas in your city",
      timestamp: "2 days ago",
      read: true,
      priority: "low"
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "appointment":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "report":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "payment":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "reminder":
        return <Bell className="h-5 w-5 text-yellow-500" />
      case "system":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/10"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
      case "low":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/10"
      default:
        return "border-l-muted bg-muted/10"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
            <motion.div
              animate={unreadCount > 0 ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              <Bell className="h-5 w-5" />
            </motion.div>
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center text-xs p-0 min-w-[1rem] min-h-[1rem]"
                    data-testid="badge-notification-count"
                  >
                    {unreadCount}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" data-testid="badge-unread-count">
                  {unreadCount} new
                </Badge>
              )}
            </SheetTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                data-testid="button-mark-all-read"
              >
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="mt-6">
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Notifications</h3>
                    <p className="text-muted-foreground">
                      You're all caught up! New notifications will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <AnimatePresence>
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <Card 
                        className={`${getPriorityColor(notification.priority)} border-l-4 ${
                          !notification.read ? 'bg-accent/50' : ''
                        }`}
                        data-testid={`card-notification-${notification.id}`}
                      >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className={`text-sm font-semibold ${
                                !notification.read ? 'text-foreground' : 'text-muted-foreground'
                              }`} data-testid={`text-notification-title-${notification.id}`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <motion.div 
                                  className="w-2 h-2 bg-primary rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              )}
                            </div>
                            <p className={`text-sm ${
                              !notification.read ? 'text-foreground' : 'text-muted-foreground'
                            }`} data-testid={`text-notification-message-${notification.id}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground" data-testid={`text-notification-time-${notification.id}`}>
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1 ml-2">
                          {!notification.read && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-6 px-2 text-xs"
                                data-testid={`button-mark-read-${notification.id}`}
                              >
                                Mark read
                              </Button>
                            </motion.div>
                          )}
                          <motion.div
                            whileHover={{ scale: 1.05, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-6 px-1"
                              data-testid={`button-delete-${notification.id}`}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                </AnimatePresence>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Notification Settings */}
        <div className="absolute bottom-4 left-4 right-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>• Email notifications for reports and appointments</p>
                <p>• SMS reminders for sample collection</p>
                <p>• Push notifications for payment updates</p>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3" data-testid="button-manage-preferences">
                Manage Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
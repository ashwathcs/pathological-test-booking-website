import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/controllers"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Info } from "lucide-react"
import { motion } from "framer-motion"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showTestCredentials, setShowTestCredentials] = useState(false)
  const { login, isLoading } = useAuth()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const result = await login({ email, password })
    
    if (result.success) {
      toast({
        title: "Login Successful",
        description: "Welcome to Pathocare360!",
      })
      onOpenChange(false)
      setEmail('')
      setPassword('')
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "Invalid credentials",
        variant: "destructive",
      })
    }
  }

  const handleTestLogin = (testEmail: string) => {
    setEmail(testEmail)
    setPassword('password123')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="dialog-login">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Login to Pathocare360
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="input-email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="input-password"
            />
          </div>

          {/* Demo Credentials Section */}
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-accent/30 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Demo Credentials</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowTestCredentials(!showTestCredentials)}
                data-testid="button-toggle-credentials"
              >
                {showTestCredentials ? 'Hide' : 'Show'}
              </Button>
            </div>
            
            {showTestCredentials && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between p-2 bg-background rounded border">
                  <div className="text-xs">
                    <div className="font-medium">Customer Account</div>
                    <div className="text-muted-foreground">john.doe@example.com</div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleTestLogin('john.doe@example.com')}
                    data-testid="button-use-customer-creds"
                  >
                    Use
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-background rounded border">
                  <div className="text-xs">
                    <div className="font-medium">Admin Account</div>
                    <div className="text-muted-foreground">admin@medtestpro.com</div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleTestLogin('admin@medtestpro.com')}
                    data-testid="button-use-admin-creds"
                  >
                    Use
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  All demo accounts use password: <Badge variant="secondary">password123</Badge>
                </p>
              </motion.div>
            )}
          </motion.div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-submit-login"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
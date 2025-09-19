import { AdminDashboard } from '../AdminDashboard'
import { ThemeProvider } from '../ThemeProvider'

export default function AdminDashboardExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <AdminDashboard />
      </div>
    </ThemeProvider>
  )
}
import { NotificationCenter } from '../NotificationCenter'
import { ThemeProvider } from '../ThemeProvider'

export default function NotificationCenterExample() {
  return (
    <ThemeProvider>
      <div className="bg-background p-4">
        <div className="flex justify-center">
          <NotificationCenter />
        </div>
      </div>
    </ThemeProvider>
  )
}
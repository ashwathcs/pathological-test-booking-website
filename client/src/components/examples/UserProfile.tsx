import { UserProfile } from '../UserProfile'
import { ThemeProvider } from '../ThemeProvider'

export default function UserProfileExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <UserProfile />
      </div>
    </ThemeProvider>
  )
}
import { Header } from '../Header'
import { ThemeProvider } from '../ThemeProvider'

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="p-8">
          <h1 className="text-2xl font-semibold">Page Content</h1>
          <p className="text-muted-foreground mt-2">The header is sticky and will stay at the top when scrolling.</p>
        </main>
      </div>
    </ThemeProvider>
  )
}
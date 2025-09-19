import { ThemeProvider } from '../ThemeProvider'

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-4 bg-background text-foreground">
        <h1 className="text-2xl font-semibold">Theme Provider Example</h1>
        <p className="text-muted-foreground">This provider enables dark/light mode switching.</p>
      </div>
    </ThemeProvider>
  )
}
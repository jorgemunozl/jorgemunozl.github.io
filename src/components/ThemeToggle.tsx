import React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = (resolvedTheme || theme) === 'dark'

  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-12 w-12 border border-slate-600 bg-white/75 text-slate-600 shadow-inner shadow-emerald-300/20 hover:bg-slate-900/5 hover:text-slate-900 dark:border-white/10 dark:bg-white/10 dark:text-white/70 dark:shadow-purple-500/20 dark:hover:bg-white/15"
    >
      {isDark ? <Sun className="h-20 w-20" /> : <Moon className="h-6 w-6" />}
    </Button>
  )
}

export default ThemeToggle 

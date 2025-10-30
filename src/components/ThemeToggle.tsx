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
      className="h-10 w-10 text-emerald-700 hover:text-cyan-600 dark:text-emerald-300 dark:hover:text-cyan-300 transition-colors [&_svg]:size-10"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}

export default ThemeToggle 

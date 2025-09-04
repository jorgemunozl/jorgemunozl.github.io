import React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = (resolvedTheme || theme) === 'dark'

  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <Button variant="ghost" size="sm" onClick={toggle} className="text-green-400 hover:text-green-300 hover:bg-green-100/20 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-gray-800/50">
      {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </Button>
  )
}

export default ThemeToggle 

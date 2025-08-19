import React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = (resolvedTheme || theme) === 'dark'

  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <Button variant="ghost" size="sm" onClick={toggle} className="text-purple-400 hover:text-purple-300 hover:bg-gray-800/50">
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  )
}

export default ThemeToggle 
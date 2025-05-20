'use client'

import { useTheme } from '@/components/theme/theme-provider'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the theme toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-[104px] h-[40px]" /> // Placeholder with same dimensions
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'light'
            ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
        aria-label="Light mode"
        title="Light mode"
      >
        <SunIcon className="w-5 h-5" />
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'dark'
            ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <MoonIcon className="w-5 h-5" />
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-colors ${
          theme === 'system'
            ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
        aria-label="System preference"
        title={`System preference (${resolvedTheme === 'dark' ? 'dark' : 'light'} mode)`}
      >
        <ComputerDesktopIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

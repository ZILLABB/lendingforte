'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'dark' | 'light' // Always resolved to actual theme (never 'system')
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  resolvedTheme: 'light',
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'lendingforte-theme',
  attribute = 'class',
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  // Initialize with defaultTheme but will be updated in useEffect
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  // Track the resolved theme (actual 'dark' or 'light', never 'system')
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light')

  // Handle system theme changes
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('light')

  // Initialize theme from localStorage on client-side only
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Get stored theme from localStorage or use default
    const storedTheme = localStorage.getItem(storageKey) as Theme | null

    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      setTheme(defaultTheme)
    }

    // Initialize system theme
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setSystemTheme(isDarkMode ? 'dark' : 'light')

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [defaultTheme, storageKey])

  // Apply theme to document and update resolvedTheme
  useEffect(() => {
    if (typeof window === 'undefined') return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    let newResolvedTheme: 'dark' | 'light'

    if (theme === 'system' && enableSystem) {
      newResolvedTheme = systemTheme
      root.classList.add(systemTheme)
    } else {
      newResolvedTheme = theme as 'dark' | 'light'
      root.classList.add(theme)
    }

    setResolvedTheme(newResolvedTheme)

    // Update data-theme attribute for components that might use it
    root.setAttribute('data-theme', newResolvedTheme)
  }, [theme, systemTheme, enableSystem])

  const value = {
    theme,
    resolvedTheme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, newTheme)
      }
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

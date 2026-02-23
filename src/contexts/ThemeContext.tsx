import { createContext, useState, useEffect, useContext, ReactNode } from 'react'

// কনটেক্সটের টাইপ সংজ্ঞা
interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

// কনটেক্সট তৈরি (ডিফল্ট মান ছাড়া)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// কাস্টম হুক – নিশ্চিত করে যে কনটেক্সট প্রোভাইডারের ভিতরেই ব্যবহার করা হচ্ছে
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// প্রোভাইডার কম্পোনেন্টের প্রপসের টাইপ
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleTheme = () => setDarkMode(!darkMode)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

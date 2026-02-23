import { createContext, useState, useContext, ReactNode } from 'react'
import { content } from '../data/content'

// কনটেক্সটের টাইপ সংজ্ঞা
interface LanguageContextType {
  lang: 'en' | 'bn';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// কনটেক্সট তৈরি (ডিফল্ট মান ছাড়া)
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// কাস্টম হুক – নিশ্চিত করে যে কনটেক্সট প্রোভাইডারের ভিতরেই ব্যবহার করা হচ্ছে
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// প্রোভাইডার কম্পোনেন্টের প্রপসের টাইপ
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [lang, setLang] = useState<'en' | 'bn'>('en') // 'en' or 'bn'

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'bn' : 'en')

  const t = (key: string): string => {
    // content[lang] এবং content.en সঠিক টাইপ পাবে কারণ content-কে Record<string, Record<string, string>> টাইপ দেওয়া হয়েছে
    return content[lang][key] || content.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

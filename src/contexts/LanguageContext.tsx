import React, { createContext, useContext, useState, useEffect } from 'react'
import { i18n, type Language } from '../lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(i18n.getLanguage())

  const setLanguage = (newLanguage: Language) => {
    i18n.setLanguage(newLanguage)
    setLanguageState(newLanguage)
  }

  const t = (key: string) => i18n.t(key)

  useEffect(() => {
    // Update document language
    document.documentElement.lang = language
  }, [language])

  const value = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
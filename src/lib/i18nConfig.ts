import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'pestgo360_language',
    },

    resources: {
      // Fallback resources in case files don't load
      tr: {
        translation: {
          common: {
            loading: 'Yükleniyor...',
            save: 'Kaydet',
            cancel: 'İptal'
          }
        }
      },
      en: {
        translation: {
          common: {
            loading: 'Loading...',
            save: 'Save',
            cancel: 'Cancel'
          }
        }
      }
    }
  })

export default i18n
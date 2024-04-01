import { createI18n } from 'vue-i18n'
import en from './en';

export const i18n = createI18n({
  legacy: false,
  locale: navigator && navigator.language || 'en',

  messages: {
    en
  }
})

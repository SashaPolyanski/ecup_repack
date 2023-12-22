import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import Backend from 'i18next-http-backend'

const ns = [
  'common',
  'main',
]
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    ns,

    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/common.json'
    }

  })

export default i18n

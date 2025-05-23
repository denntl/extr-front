import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import { Auth } from 'src/providers/AuthProvider'
import './i18n'

Auth.init()

createRoot(document.getElementById('root')).render(
  <Provider store={store} basename="/admin">
    <App />
  </Provider>,
)

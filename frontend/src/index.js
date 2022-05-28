import React from 'react'
import { StrictMode } from 'react'
import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App></App>
    </PersistGate>
  </Provider>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
<<<<<<< HEAD

// تحميل i18n بشكل آمن
import('./i18n/config.js').catch(error => {
  console.warn('i18n config failed to load:', error)
})
=======
import './i18n/config.js'
>>>>>>> 4da21e65b57ef508e0beb6d7d4541aa174316e11

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

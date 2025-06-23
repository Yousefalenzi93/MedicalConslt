import React from 'react'
import ReactDOM from 'react-dom/client'
import TestApp from './TestApp.jsx'
import './index.css'

console.log('🚀 Starting React App...')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)

console.log('✅ React App mounted successfully!')

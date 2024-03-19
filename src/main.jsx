import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PathfindProvider } from './context/pathfindContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PathfindProvider>
      <App />
    </PathfindProvider>  
  </React.StrictMode>,
)

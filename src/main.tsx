import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { PathfindProvider } from './context/pathfindContext.js'

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <PathfindProvider>
      <App />
    </PathfindProvider>  
  </React.StrictMode>,
)

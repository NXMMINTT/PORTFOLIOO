import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './tvhero.css'
import './sections.css'
import './popular.css'
import './neon.css'
import './theme-red.css'
import './about.css'
import './contact.css'
import './stickynav.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

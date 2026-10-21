import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ContactPage from './ContactPage.jsx'
import './styles.css'
import './sections.css'
import './theme-red.css'
import './contact.css'
import './stickynav.css'
import './packages.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactPage />
  </StrictMode>,
)

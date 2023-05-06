import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from '@/App'

import '@/styles/index.css'
import 'mathlive'

createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

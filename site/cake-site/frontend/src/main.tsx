import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n.ts'
import { LangProvider } from './context/LangContext.tsx'

createRoot(document.getElementById('root')!).render(
  <LangProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </LangProvider>
);

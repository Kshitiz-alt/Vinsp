import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './Constants/translation';


createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>


    <StrictMode>
      <App />
    </StrictMode>,
  </I18nextProvider>
)

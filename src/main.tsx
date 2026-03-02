import React from 'react'\nimport '@fontsource/ibm-plex-sans/400.css'\nimport '@fontsource/ibm-plex-sans/500.css'\nimport '@fontsource/ibm-plex-sans/600.css'\nimport '@fontsource/fraunces/600.css'\nimport '@fontsource/fraunces/700.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)


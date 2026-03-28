import { createRoot } from 'react-dom/client'
import App from './App'
import PhraseProvider from './context/PhraseProvider'
import './styles.css'
import SpeechProvider from './context/SpeechProvider'

createRoot(document.getElementById('root')!).render(
  <SpeechProvider>
    <PhraseProvider>
      <App />
    </PhraseProvider>
  </SpeechProvider>,
)

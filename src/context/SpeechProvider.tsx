import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type SpeechContext = {
  voices: SpeechSynthesisVoice[]
  voice?: string
  setVoice: (voiceURI: string) => void
  read: (text: string) => void
}

const Context = createContext<SpeechContext>({
  voices: [],
  setVoice: () => {},
  read: () => {},
})

const getVoices = () => {
  const voices = window.speechSynthesis.getVoices()
  const frenchVoices = voices.filter((voice) => voice.lang.startsWith('fr-'))
  return frenchVoices.length ? frenchVoices : voices
}

export const useSpeech = () => useContext(Context)

const SpeechProvider: FC<{ children: ReactNode }> = (props) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(getVoices)
  const [voicesRetry, setVoicesRetry] = useState<boolean>(false)
  const [voice, setVoice] = useState<string | undefined>(undefined)

  useEffect(() => {
    const listener = () => setVoices(getVoices)
    window.speechSynthesis.addEventListener('voiceschanged', listener)
    return () =>
      window.speechSynthesis.removeEventListener('voiceschanged', listener)
  }, [])

  useEffect(() => {
    const voice = voices.at(0)
    if (!voice) {
      if (!voicesRetry) {
        // if voices aren't loaded, retry once (to make sure doesn't retry repeatedly)
        setVoices(() => {
          setVoicesRetry(true)
          return getVoices()
        })
      }
      return
    }
    setVoice(voice.voiceURI)
    if (!voice.lang.startsWith('fr-'))
      alert(
        'No French text-to-speech voices found. Please check you have the French speech pack installed on your OS',
      )
  }, [voices])

  const value: SpeechContext = {
    voices,
    voice,
    setVoice,
    read(text) {
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'fr-FR'
      utter.voice = voices.find((v) => v.voiceURI == voice) || null
      window.speechSynthesis.speak(utter)
    },
  }

  return <Context.Provider value={value} {...props} />
}

export default SpeechProvider

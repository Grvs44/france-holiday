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
  const [voice, setVoice] = useState<string | undefined>(undefined)

  useEffect(() => {
    const listener = () => setVoices(window.speechSynthesis.getVoices())
    window.speechSynthesis.addEventListener('voiceschanged', listener)
    return () =>
      window.speechSynthesis.removeEventListener('voiceschanged', listener)
  }, [])

  useEffect(() => {
    const voice = voices.at(0)
    if (voice?.lang.startsWith('fr-')) setVoice(voice.voiceURI)
    else
      alert(`Text-to-speech warning: no French voices found
Please install the French speech pack for your OS`)
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

import { FC } from 'react'
import Phrase from '../components/Phrase'
import VoiceSelect from '../components/VoiceSelect'
import { usePhrases } from '../context/PhraseProvider'
import { useSpeech } from '../context/SpeechProvider'

const PhraseContainer: FC = () => {
  const phrases = usePhrases()
  const speech = useSpeech()

  return (
    <div>
      <h2>Phrases</h2>
      <p>Click a phrase below to listen to the French pronounciation</p>
      <div>
        <VoiceSelect
          value={speech.voice}
          voices={speech.voices}
          setVoice={speech.setVoice}
        />
      </div>
      {phrases.length ? (
        <ul>
          {phrases.map((phrase, key) => (
            <Phrase key={key} phrase={phrase} read={speech.read} />
          ))}
        </ul>
      ) : (
        <p>Loading phrases...</p>
      )}
    </div>
  )
}

export default PhraseContainer

import { FC } from 'react'
import Phrase from '../components/Phrase'
import VoiceSelect from '../components/VoiceSelect'
import { usePhrases } from '../context/PhraseProvider'
import { useSpeech } from '../context/SpeechProvider'

const PhraseContainer: FC = () => {
  const phraseGroups = usePhrases()
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
      {phraseGroups.length ? (
        phraseGroups.map((group, key) => (
          <div key={key}>
            <h3>{group.title}</h3>
            <ul>
              {group.phrases.map((phrase, key) => (
                <Phrase key={key} phrase={phrase} read={speech.read} />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading phrases...</p>
      )}
    </div>
  )
}

export default PhraseContainer

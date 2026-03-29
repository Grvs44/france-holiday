import { FC } from 'react'
import PhraseList from '../components/PhraseList'
import RateSelect from '../components/RateSelect'
import VoiceSelect from '../components/VoiceSelect'
import { usePhrases } from '../context/PhraseProvider'
import { useSpeech } from '../context/SpeechProvider'

const PhraseContainer: FC = () => {
  const phraseGroups = usePhrases()
  const speech = useSpeech()

  return (
    <div>
      <h2>Phrases</h2>
      <p>
        Click a heading below, then click a phrase to listen to the French
        pronounciation
      </p>
      <div>
        <VoiceSelect
          value={speech.voice}
          voices={speech.voices}
          setVoice={speech.setVoice}
        />
        <RateSelect rate={speech.rate} setRate={speech.setRate} />
      </div>
      {phraseGroups.length ? (
        phraseGroups.map((group, key) => (
          <PhraseList group={group} read={speech.read} key={key} />
        ))
      ) : (
        <p>Loading phrases...</p>
      )}
    </div>
  )
}

export default PhraseContainer

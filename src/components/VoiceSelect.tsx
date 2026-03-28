import { FC } from 'react'

const VoiceSelect: FC<{
  value?: string
  voices: SpeechSynthesisVoice[]
  setVoice: (voiceURI: string) => void
}> = (props) => (
  <label>
    {'Voice: '}
    <select
      name="phrase-voice"
      value={props.value}
      onChange={(event) => props.setVoice(event.target.value)}
    >
      {props.voices.map((voice, key) => (
        <option key={key} value={voice.voiceURI}>
          {voice.name}
        </option>
      ))}
    </select>
  </label>
)

export default VoiceSelect

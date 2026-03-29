import { FC, useState } from 'react'
import { PhraseGroup } from '../context/PhraseProvider'
import Phrase from './Phrase'

const PhraseList: FC<{
  group: PhraseGroup
  read: (text: string) => void
}> = ({ group, read }) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <div className="phraselist">
      <h3 onClick={() => setShow((show) => !show)}>{group.title}</h3>
      {show ? (
        <ul>
          {group.phrases.map((phrase, key) => (
            <Phrase key={key} phrase={phrase} read={read} />
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default PhraseList

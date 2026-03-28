import { FC } from 'react'

const Phrase: FC<{
  phrase: string[]
  read: (text: string) => void
}> = ({ phrase, read }) => (
  <li className="phrase" onClick={() => read(phrase[1])}>
    <span>{phrase[0]}</span>
    <span lang="fr-FR">{phrase[1]}</span>
  </li>
)

export default Phrase

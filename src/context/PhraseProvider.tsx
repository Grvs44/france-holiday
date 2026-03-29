import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { parse } from 'papaparse'

export type PhraseGroup = {
  title: string
  phrases: string[][]
}

const Context = createContext<PhraseGroup[]>([])

export const usePhrases = () => useContext(Context)

const PhraseProvider: FC<{ children: ReactNode }> = (props) => {
  const [phrases, setPhrases] = useState<PhraseGroup[]>([])

  useEffect(() => {
    parse<string[]>('./phrases.csv', {
      download: true,
      complete: ({ data }) =>
        setPhrases(() => {
          const titles = data
            .map<[string[], number]>((row, index) => [row, index])
            .filter(([row, _]) => row.at(0)?.startsWith('#'))
          return titles.map(([row, dataIndex], titleIndex) => ({
            title: row[0].substring(1),
            phrases: data.slice(dataIndex + 1, titles.at(titleIndex + 1)?.[1]),
          }))
        }),
      skipEmptyLines: 'greedy',
    })
  }, [])

  return <Context.Provider value={phrases} {...props} />
}

export default PhraseProvider

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { parse } from 'papaparse'

const Context = createContext<string[][]>([])

export const usePhrases = () => useContext(Context)

const PhraseProvider: FC<{ children: ReactNode }> = (props) => {
  const [phrases, setPhrases] = useState<string[][]>([])

  useEffect(() => {
    parse<string[]>('./phrases.csv', {
      download: true,
      complete: ({ data }) => setPhrases(data),
      skipEmptyLines: 'greedy',
    })
  }, [])

  return <Context.Provider value={phrases} {...props} />
}

export default PhraseProvider

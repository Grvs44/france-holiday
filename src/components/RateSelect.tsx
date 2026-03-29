import { FC } from 'react'

const RateSelect: FC<{
  rate: number
  setRate: (rate: number) => void
}> = ({ rate, setRate }) => (
  <p>
    <label>
      {'Rate: '}
      <input
        type="range"
        name="rate"
        min={0.5}
        max={2}
        step={0.1}
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
      />
    </label>{' '}
    <span>{rate}</span>
  </p>
)

export default RateSelect

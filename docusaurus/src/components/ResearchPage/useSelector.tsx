import React, { useState } from "react"

interface SelectorLabelProps<T> {
  name: string
  valueToSelect: T
  currentValue: T
  setValue: (value: T) => void
  valueToString: (value: T) => string
}
function SelectorLabel<T>({name, valueToSelect, currentValue, setValue, valueToString}: SelectorLabelProps<T>): JSX.Element {
  return (
    <label>
      <input type="radio" name={name} value={valueToString(valueToSelect)}
        onChange={() => setValue(valueToSelect)}
        checked={valueToSelect === currentValue}/>
      <span>{valueToString(valueToSelect)}</span>
    </label>
  )
}

export function useSelector<T>(values: readonly T[], initialValue: T, valueToString: (value: T) => string): [T, JSX.Element] {
  const names = values.map(valueToString).join(", ")
  const name = `[${names}]`
  const [currentValue, setCurrentValue] = useState<T>(initialValue)
  const div = (
    <div>
      {values.map(value => <SelectorLabel name={name} valueToSelect={value} currentValue={currentValue} setValue={setCurrentValue} valueToString={valueToString} key={valueToString(value)}/>)}
    </div>
  )
  return [currentValue, div]
}

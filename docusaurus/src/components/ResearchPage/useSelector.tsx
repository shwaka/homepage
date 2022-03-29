import React, { useState } from "react"

interface SelectorLabelProps<T> {
  valueToSelect: T
  currentValue: T
  setValue: (value: T) => void
  valueToString: (value: T) => string
}
function SelectorLabel<T>({valueToSelect, currentValue, setValue, valueToString}: SelectorLabelProps<T>): JSX.Element {
  return (
    <label>
      <input type="radio" name="listFormat" value={valueToString(valueToSelect)}
        onChange={() => setValue(valueToSelect)}
        checked={valueToSelect === currentValue}/>
      <span>{valueToString(valueToSelect)}</span>
    </label>
  )
}

export function useSelector<T>(values: readonly T[], initialValue: T, valueToString: (value: T) => string): [T, JSX.Element] {
  const [currentValue, setCurrentValue] = useState<T>(initialValue)
  const div = (
    <div>
      {values.map(value => <SelectorLabel valueToSelect={value} currentValue={currentValue} setValue={setCurrentValue} valueToString={valueToString} key={valueToString(value)}/>)}
    </div>
  )
  return [currentValue, div]
}

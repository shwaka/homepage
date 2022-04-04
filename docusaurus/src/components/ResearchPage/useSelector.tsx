import React, { useState } from "react"

export interface SelectorProps<T> {
  name: string
  values: readonly T[]
  valueToString: (value: T) => string
  currentValue: T
  setValue: (value: T) => void
}
export function Selector<T>({name, values, valueToString, currentValue, setValue}: SelectorProps<T>): JSX.Element {
  return (
    <div>
      {values.map(value => (
        <label key={valueToString(value)}>
          <input
            type="radio" name={name}
            value={valueToString(value)}
            onChange={() => setValue(value)}
            checked={value === currentValue}/>
          <span>{valueToString(value)}</span>
        </label>
      ))}
    </div>
  )
}

export function useSelector<T>(values: readonly T[], initialValue: T, valueToString: (value: T) => string): [T, SelectorProps<T>] {
  // https://dev.to/droopytersen/new-react-hooks-pattern-return-a-component-31bh を参考にした
  const names = values.map(valueToString).join(", ")
  const name = `[${names}]`
  const [currentValue, setCurrentValue] = useState<T>(initialValue)
  const props: SelectorProps<T> = {
    name: name,
    values: values,
    valueToString: valueToString,
    currentValue: currentValue,
    setValue: setCurrentValue,
  }
  return [currentValue, props]
}

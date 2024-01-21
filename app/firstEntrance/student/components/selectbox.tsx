'use client'
import { ChangeEventHandler } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface SelectBoxProps {
  id: string
  register: UseFormRegister<any>
  name: string
  selectedOpt: string
  options: any[]
  handleChange?: ChangeEventHandler<HTMLSelectElement>
  selectPlaceHolder?: string
  guideText?: string
  validationObj?: { [key: string]: string | number | boolean }
}

const SelectBox: React.FC<SelectBoxProps> = ({
  id,
  register,
  name,
  selectedOpt,
  options,
  handleChange,
  guideText,
  selectPlaceHolder,
  validationObj,
}) => {
  return (
    <select {...register(id, validationObj)} name={name} id={id} defaultValue={guideText ? guideText : selectedOpt} onChange={handleChange}>
      <option value="">{selectPlaceHolder}</option>
      {options.map((item, i) => (
        <option key={i} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  )
}

export default SelectBox

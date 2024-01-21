'use client'

import { UseFormRegister } from 'react-hook-form'

interface ICheckbox {
  id: string
  htmlFor: string

  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  register: UseFormRegister<any>
}
const Checkbox = ({ id, htmlFor, label, onChange, register }: ICheckbox) => {
  return (
    <div>
      <input {...register(id)} type="checkbox" id={id} onChange={onChange} />
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  )
}

export default Checkbox

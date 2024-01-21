'use client'
import { ChangeEventHandler } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface InputPropsRegister {
  inputType: 'password' | 'text' | 'email'
  id: string
  register: UseFormRegister<any>
  htmlFor: string
  name: string
  label: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  validationObj?: { [key: string]: string | number | boolean }
}

const InputRegist: React.FC<InputPropsRegister> = ({ inputType, id, register, htmlFor, name, label, onChange, placeholder, validationObj }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={inputType}
        {...register(id, validationObj)}
        id={id}
        name={name}
        onChange={onChange}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          let key = event.key || event.keyCode

          if (key === 'Enter' || key === 13) {
            event.preventDefault()
          }
        }}
        placeholder={placeholder}
        autoComplete="true"
        autoFocus={true}
      />
    </div>
  )
}

export default InputRegist

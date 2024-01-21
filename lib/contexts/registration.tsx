'use client'
//context : context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다
//데이터가 필요할 때마다 props를 통해 전달할 필요가 없이 context 를 이용해 공유

//createContext : 데이터 객체 생성
//useContext : 생성한 데이터를 불러와서 바로 사용하게 함

//Provider : 생성한 context를 하위 컴포넌트에게 전달하는 역할
//Consumer : context의 변화를 감시하는 컴포넌트

import { useSession } from 'next-auth/react'
import { ReactNode, createContext, useContext, useState } from 'react'

//Type
export type RegistrationType = {
  agreement1: boolean
  agreement2: boolean
  step: number
  login_id: string
  password: string
  user_name: string
  birth_year: string
  gender: string
  email: string
  provider: any
  [key: string]: boolean | number | string // 인덱스 서명을 추가합니다.
}

//Context Type
export type RegistrationContextType = {
  registrationInfo: RegistrationType
  setRegistrationInfo: (info: RegistrationType) => void // 함수 타입을 이렇게 수정합니다.
}

// :: Context Data
const RegistrationContext = createContext<RegistrationContextType>({
  registrationInfo: {
    agreement1: false,
    agreement2: false,
    step: 1,
    login_id: '',
    password: '',
    user_name: '',
    birth_year: '',
    gender: '',
    email: '',
    provider: '',
  },
  setRegistrationInfo: () => {},
})

// :: Context Provider
export const RegistrationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //Session
  //const { data: session } = useSession()

  //State : registration info
  const [registrationInfo, setRegistrationInfo] = useState({
    agreement1: false,
    agreement2: false,
    step: 1,
    login_id: '',
    password: '',
    user_name: '',
    birth_year: '',
    gender: '',
    email: '',
    provider: 'credentials',
    //email: session?.user.email || '',
    //provider: session?.user.provider == null ? 'credentials' : session?.user.provider,
  })

  return <RegistrationContext.Provider value={{ registrationInfo, setRegistrationInfo }}>{children}</RegistrationContext.Provider>
}

// :: useContext Hook
export const useRegistrationContext = () => useContext(RegistrationContext)

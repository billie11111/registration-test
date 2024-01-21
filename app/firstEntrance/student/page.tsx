'use client'
import React, { useState } from 'react'
import { useRegistrationContext } from '@/lib/contexts/registration'
import { useRouter } from 'next/navigation'
import Checkbox from './components/checkbox'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

export const BtnContainer = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & > button {
    border: none;
    padding: 10px 15px;
    width: 200px;
    cursor: pointer;
    background-color: green;
    color: white;
    &:disabled {
      background-color: lightgrey;
    }
  }
`

const FirstStepPage: React.FC = () => {
  const router = useRouter()
  const { registrationInfo, setRegistrationInfo } = useRegistrationContext()
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<any>()
  const [disabled, setDisabled] = useState(true)

  //제3자동의 체크박스 값 업데이트
  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target

    //클릭된 체크박스의 이름을 키로 값을 업데이트
    setRegistrationInfo({ ...registrationInfo, [name]: checked })
  }

  //다음 단계로 이동
  const handleNextPageButton = () => {
    //관리자 최초 회원가입으로 provider는 credentials (SNS가입 X)
    // if (registrationInfo.provider === PROVIDER.CREDENTIALS) {
    //   router.push('/registration/2')
    // }
    console.log(registrationInfo)
    router.push('/firstEntrance/student/2')
  }

  //watch
  const watchFields = watch(['agreement1', 'agreement2'])

  console.log(watchFields)

  return (
    <article>
      <h2>1단계 : 제 3자 동의</h2>
      <form>
        <fieldset>
          <legend>제 3자동의 체크박스 폼</legend>
          <Checkbox register={register} id="agreement1" htmlFor="agreement1" label="1번 동의" onChange={handleCheckBox} />
          <Checkbox register={register} id="agreement2" htmlFor="agreement2" label="2번 동의" onChange={handleCheckBox} />
        </fieldset>

        <BtnContainer>
          <button type="button" onClick={handleNextPageButton} disabled={false}>
            다음
          </button>
        </BtnContainer>
      </form>
    </article>
  )
}

export default FirstStepPage

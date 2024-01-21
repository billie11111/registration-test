'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRegistrationContext } from '@/lib/contexts/registration'
import InputRegist from '../components/inputRegist'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BtnContainer } from '../page'

const SecondStepPage: React.FC = () => {
  const router = useRouter()
  const { registrationInfo, setRegistrationInfo } = useRegistrationContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>()

  //가입 2단계 : registrationInfo 객체의 step값 2로 업데이트
  useEffect(() => {
    setRegistrationInfo({ ...registrationInfo, step: 2 })
  }, [])

  //다음 가입 단계로 이동
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data)

    // 빈 값이 있는지 확인
    const checkValidation = Object.values(data).every((item) => item)
    if (!checkValidation) {
      return alert('내용을 모두 입력해주세요.')
    }

    // 비밀번호 일치 확인
    if (data.password !== data.confirmPassword) {
      return alert('비밀번호가 일치하지 않습니다.')
    }

    //위의 조건을 모두 통과하면 다음 스텝으로 이동
    router.push('/firstEntrance/student/3')
  }

  //submit
  // 작성 완료 버튼
  // const onSubmit: SubmitHandler<IFirstEntranceStudent> = async (data) => {
  //   console.log(data)

  //   // 빈 값이 있는지 확인
  //   const checkValidation = Object.values(data).every((item) => item)
  //   if (!checkValidation) {
  //     return alert('내용을 모두 입력해주세요.')
  //   }

  //   // 비밀번호 일치 확인
  //   if (data.password !== data.confirmPassword) {
  //     return alert('비밀번호가 일치하지 않습니다.')
  //   }

  //   const userIdx = session?.user?.idx
  //   const updateResult = updateFirstLoginStudent(userIdx as string, data)

  //   // session update
  //   update({
  //     is_new: false,
  //   })
  //   // 위의 조건을 모두 통과하면 홈페이지로 이동
  //   router.push('/')
  // router.push('/firstEntrance/student/3')
  // }

  return (
    <article>
      <h2>2단계 : 비밀번호 변경 및 확인</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>비밀번호 변경 및 확인 폼</legend>
          <InputRegist
            register={register}
            inputType="password"
            id="password"
            htmlFor="password"
            name="password"
            label="비밀번호 :"
            placeholder="비밀번호 입력"
          />
          <InputRegist
            register={register}
            inputType="password"
            id="confirmPassword"
            htmlFor="confirmPassword"
            name="confirmPassword"
            label="비밀번호 확인 :"
            placeholder="비밀번호 재입력"
          />
        </fieldset>

        <BtnContainer>
          <button type="button" onClick={() => window.history.back()}>
            이전
          </button>
          <button type="submit">다음</button>
        </BtnContainer>
      </form>
    </article>
  )
}

export default SecondStepPage

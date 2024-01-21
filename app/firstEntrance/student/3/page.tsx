'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRegistrationContext } from '@/lib/contexts/registration'
import SelectBox from '../components/selectbox'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import InputRegist from '../components/inputRegist'
import { BtnContainer } from '../page'

const LastStepPage: React.FC = () => {
  const router = useRouter()
  const { registrationInfo, setRegistrationInfo } = useRegistrationContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  //가입 3단계 : registrationInfo 객체의 step값 3으로 업데이트
  useEffect(() => {
    setRegistrationInfo({ ...registrationInfo, step: 3 })
  }, [])

  //사교육 경험 있는 CASE state
  const [showPrivateEdu, setShowPrivateEdu] = useState(false)
  const [educationTypesEtc, setEducationTypesEtc] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('survey >>>', data)
    console.log('registrationInfo >> ', registrationInfo)

    //router.push('/')
  }

  return (
    <article>
      <h2>3단계 : 회원정보 설문조사</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 출생연도 : birth_year */}
        <fieldset>
          <legend>출생연도</legend>
          <SelectBox
            id="birth_year"
            name="birth_year"
            register={register}
            validationObj={{ required: '출생연도를 선택하세요' }}
            options={[
              { name: '2003', value: '2003' },
              { name: '2004', value: '2004' },
            ]}
            selectedOpt="출생연도"
            selectPlaceHolder="출생연도"
          />
          {errors.birth_year?.message && <p>{errors.birth_year.message.toString()}</p>}
        </fieldset>

        {/* 성별 : student_gender */}
        <fieldset>
          <legend>성별</legend>
          <SelectBox
            id="student_gender"
            name="student_gender"
            register={register}
            validationObj={{ required: '성별을 선택하세요' }}
            options={[
              { name: '남자', value: 'male' },
              { name: '여자', value: 'female' },
            ]}
            selectedOpt="성별"
            selectPlaceHolder="성별"
          />
          {errors.student_gender?.message && <p>{errors.student_gender.message.toString()}</p>}
        </fieldset>

        {/* 사교육 경험 유무 : private_education_experience */}
        <fieldset>
          <legend>사교육 경험</legend>
          <SelectBox
            id="private_education_experience"
            name="private_education_experience"
            register={register}
            validationObj={{ required: '사교육 경험 유무를 선택하세요' }}
            options={[
              { name: '있음', value: true },
              { name: '없음', value: false },
            ]}
            selectedOpt="사교육 경험 유무"
            selectPlaceHolder="사교육 경험 유무"
            handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setShowPrivateEdu(Boolean(e.target.value === 'true' ? true : false))
            }}
          />
          {errors.private_education_experience?.message && <p>{errors.private_education_experience.message.toString()}</p>}
        </fieldset>

        {/* :: 사교육 경험 있는 CASE */}
        {showPrivateEdu && (
          <>
            <fieldset>
              <legend>사교육을 경험한 기간이 얼마나 되나요?</legend>
              <SelectBox
                id="private_education_duration"
                name="private_education_duration"
                register={register}
                validationObj={{ required: '사교육 경험 기간을 선택하세요' }}
                options={[
                  { name: '3개월~6개월', value: '3개월~6개월' },
                  { name: '6개월~9개월', value: '6개월~9개월' },
                  { name: '12개월 초과', value: '12개월 초과' },
                ]}
                selectedOpt="사교육을 경험한 기간이 얼마나 되나요?"
                selectPlaceHolder="사교육을 경험한 기간이 얼마나 되나요?"
              />
              {errors.private_education_duration?.message && <p>{errors.private_education_duration.message.toString()}</p>}
            </fieldset>
            <fieldset>
              <legend>경험한 사교육은 무엇이 있나요?</legend>
              <SelectBox
                id="experienced_supplementary_education_types"
                name="experienced_supplementary_education_types"
                register={register}
                validationObj={{ required: '경험한 사교육을 선택하세요' }}
                options={[
                  { name: '학원(보습학원, 입시학원)', value: '학원(보습학원, 입시학원)' },
                  { name: '인터넷강의', value: '인터넷강의' },
                  { name: '실시간 화상 강의', value: '실시간 화상 강의' },
                  { name: '과외', value: '과외' },
                  { name: '기타(직접입력)', value: '기타(직접입력)' },
                ]}
                selectedOpt="경험한 사교육은 무엇이 있나요?"
                selectPlaceHolder="경험한 사교육은 무엇이 있나요?"
                handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setEducationTypesEtc(e.target.value === '기타(직접입력)' ? true : false)
                }}
              />
              {errors.experienced_supplementary_education_types?.message && (
                <p>{errors.experienced_supplementary_education_types.message.toString()}</p>
              )}
            </fieldset>

            {/* 경험한 사교육의 종류 : 기타 CASE Show */}
            {educationTypesEtc && (
              <fieldset>
                <legend>기타일 경우 경험한 사교육</legend>
                <InputRegist
                  register={register}
                  validationObj={{ required: '기타 경험한 사교육을 적어주세요' }}
                  inputType="text"
                  id="experienced_supplementary_education_types_etc"
                  htmlFor="experienced_supplementary_education_types_etc"
                  name="experienced_supplementary_education_types_etc"
                  label="기타일 경우 경험한 사교육을 적어주세요"
                  placeholder="기타일 경우 경험한 사교육을 적어주세요"
                />
                {errors.experienced_supplementary_education_types_etc?.message && (
                  <p>{errors.experienced_supplementary_education_types_etc.message.toString()}</p>
                )}
              </fieldset>
            )}

            {/* 현재 사교육 상태 */}
            <fieldset>
              <legend>현재도 사교육을 받고 있나요?</legend>
              <SelectBox
                id="currently_receiving_private_education"
                name="currently_receiving_private_education"
                register={register}
                validationObj={{ required: '현재 사교육 상태를 선택해주세요' }}
                options={[
                  { name: '그렇다', value: true },
                  { name: '아니다', value: false },
                ]}
                selectedOpt="현재도 사교육을 받고 있나요?"
                selectPlaceHolder="현재도 사교육을 받고 있나요?"
              />
              {errors.currently_receiving_private_education?.message && <p>{errors.currently_receiving_private_education.message.toString()}</p>}
            </fieldset>
          </>
        )}

        <BtnContainer>
          <button type="button" onClick={() => window.history.back()}>
            이전
          </button>
          <button type="submit">제출</button>
        </BtnContainer>
      </form>
    </article>
  )
}

export default LastStepPage

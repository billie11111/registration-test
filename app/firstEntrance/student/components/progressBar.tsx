'use client'
import React from 'react'
import { useRegistrationContext } from '@/lib/contexts/registration'
import styled from 'styled-components'

const ProgressWrapper = styled.div`
  border: 1px solid red;
  & > ul {
    display: flex;
    gap: 10px;
    list-style: none;
  }
`
const StepItem = styled.div<{ $active: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.$active ? 'pink' : 'skyblue')};
  color: ${(props) => (props.$active ? 'red' : 'black')};
`
const ProgressBar: React.FC = () => {
  const { registrationInfo, setRegistrationInfo } = useRegistrationContext()

  //관리자 provider: credentials 의 회원가입 단계는 3단계
  const stepsToShow = registrationInfo.provider === 'credentials' ? 3 : 2

  return (
    <ProgressWrapper>
      <h1>Progress Step</h1>
      <ul>
        {Array.from({ length: stepsToShow }, (_, i) => (
          <StepItem key={i} $active={registrationInfo.step > i}>
            {i + 1}
          </StepItem>
        ))}
      </ul>
    </ProgressWrapper>
  )
}

export default ProgressBar

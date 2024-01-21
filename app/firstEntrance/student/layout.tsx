'use client'
import { FC, ReactNode } from 'react'
import { RegistrationContextProvider } from '@/lib/contexts/registration'
import ProgressBar from './components/progressBar'

const FirstEntranceLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RegistrationContextProvider>
      <main>
        <ProgressBar />
        {children}
      </main>
    </RegistrationContextProvider>
  )
}

export default FirstEntranceLayout

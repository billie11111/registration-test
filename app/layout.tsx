import StyledComponentsRegistry from '@/lib/styles/registry'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registration Test',
  description: 'Registration Test',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}

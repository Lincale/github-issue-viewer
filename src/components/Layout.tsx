import { styled } from '@mui/material'
import { FC, ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

const Container = styled('div')({
  minHeight: '100vh',
  padding: '0 0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

const Main = styled('main')({
  padding: '5rem 0',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  )
}

export default Layout

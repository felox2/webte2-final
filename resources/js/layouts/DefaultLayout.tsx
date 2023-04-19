import { PropsWithChildren } from 'react'
import Navbar from '@/components/Navbar'
import { Box } from '@mui/material'

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      <Box
        component='main'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}>
        <Box maxWidth='lg' marginX='auto' marginY={1}>
          {children}
        </Box>
      </Box>
    </div>
  )
}

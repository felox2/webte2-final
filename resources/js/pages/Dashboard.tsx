import { Head } from '@inertiajs/react'
import { Box, Typography } from '@mui/material'
import { PageProps } from '@/types'

export default function Dashboard({ auth }: PageProps) {
  return (
    <>
      <Head title='Dashboard' />
      <Typography variant='h3' />
      <Typography variant='body1'>
        Dashboard is the protected page. You can only access this page if you are logged
        in.
      </Typography>

      <Box mt={2}>
        <Typography variant='h4'>User</Typography>
        <Typography variant='body1'>Name: {auth.user.name}</Typography>
      </Box>
    </>
  )
}

import { Box, Typography } from '@mui/material'

export default function Dashboard() {
  return (
    <>
      <Typography variant='h3' />
      <Typography variant='body1'>
        Dashboard is the protected page. You can only access this page if you are logged
        in.
      </Typography>

      <Box mt={2}>
        <Typography variant='h4'>User</Typography>
        <Typography variant='body1'>Name: TODO</Typography>
      </Box>
    </>
  )
}

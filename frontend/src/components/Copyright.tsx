import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { ComponentProps } from 'react'

export default function Copyright(props: ComponentProps<typeof Typography>) {
  return (
    <Typography component='footer' variant='body2' color='text.secondary' align='center' py={2} {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

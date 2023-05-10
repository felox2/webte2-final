import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function Copyright(props: any) {
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

import Typography from '@mui/material/Typography'
import { ComponentProps } from 'react'

export default function Copyright(props: ComponentProps<typeof Typography>) {
  return (
    <Typography
      component='footer'
      variant='body2'
      color='text.secondary'
      align='center'
      py={2}
      {...props}>
      {'Copyright © '}
      <b>Pengu</b> {new Date().getFullYear()}
    </Typography>
  )
}

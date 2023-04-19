import { Head } from '@inertiajs/react'
import { Typography } from '@mui/material'

interface Props {
  status?: string
}

export default function Edit({ status }: Props) {
  return (
    <div>
      <Head title='Profile' />
      <Typography>
        Profile
      </Typography>
    </div>
  )
}

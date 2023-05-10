import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '@/components/Copyright'
import { AuthContext } from '@/components/AuthProvider'
import { ky } from '@/utils/ky'
import SnackbarContext from '@/components/SnackbarProvider'

export default function SignUp() {
  const auth = useContext(AuthContext)
  const { triggerSnackbar } = useContext(SnackbarContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    try {
      const res: any = await ky.post('auth/register', { body: data }).json()
      auth.handleLogin(res.access_token)
      triggerSnackbar('Registered successfully', 'success')
    }
    catch (err) {
      console.error(err)
      triggerSnackbar('Couldn\'t register', 'error')
    }

  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='first_name'
                required
                fullWidth
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label='Last Name'
                name='last_name'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password_confirmation'
                label='Password Repeat'
                type='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/auth/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

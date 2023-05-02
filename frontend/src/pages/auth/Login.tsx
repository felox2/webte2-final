import { useContext, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '@/components/Copyright'
import { FormattedMessage } from 'react-intl'
import ky from '@/utils/ky'
import { AuthContext } from '@/components/AuthProvider'
import { useNavigate } from 'react-router-dom'
import SnackbarContext from '@/components/SnackbarProvider'

export default function SignIn() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const { triggerSnackbar } = useContext(SnackbarContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    
    try {
      const res: any = await ky.post('auth/login', { body: data }).json()
      auth.handleLogin(res.access_token)
      navigate('/')
      triggerSnackbar('Logged in successfully', 'success')
    }
    catch (err) {
      triggerSnackbar('Couldn\'t log in', 'error')
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
          <FormattedMessage id='auth.login' />
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' name='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            <FormattedMessage id='auth.login' defaultMessage='Sign In' />
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/auth/register' variant='body2'>
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

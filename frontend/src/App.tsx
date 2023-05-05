import { useContext, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { AuthContext, AuthProvider } from '@/components/AuthProvider'
import { Box, CssBaseline, IconButton, Menu, MenuItem, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import IconTranslate from '@mui/icons-material/Translate'
import router from '@/router'
import theme from '@/theme'
import messages from '@/locales'
import { SnackbarProvider } from './components/SnackbarProvider'

export default function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [locale, setLocale] = useState<keyof typeof messages>('en')
  const currentMessages = useMemo(() => messages[locale], [locale])
  const open = Boolean(anchorEl)
  const locales = Object.keys(messages) as Array<keyof typeof messages>
  const { initializing } = useContext(AuthContext)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function changeLocale(locale: keyof typeof messages) {
    setLocale(locale)
    handleClose()
  }

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider defaultLocale='en' locale={locale} messages={currentMessages}>
        <SnackbarProvider>
          <AuthProvider>
            <Box sx={{ position: 'fixed', right: 0, top: 0, mt: 2, mr: 2 }}>
              <IconButton onClick={handleClick}>
                <IconTranslate />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {locales.map((locale) => (
                  <MenuItem key={locale} onClick={() => changeLocale(locale)}>
                    {locale}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <CssBaseline />
            <RouterProvider router={router} />

            {/* TODO: maybe add a loader */}
            {initializing ? (
              <Box sx={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
              }} />
            ) : null}
          </AuthProvider>
        </SnackbarProvider>
      </IntlProvider>
    </ThemeProvider>
  )
}

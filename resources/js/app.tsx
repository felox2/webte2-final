import './bootstrap'
import '../css/app.css'

import { createRoot } from 'react-dom/client'
import { Link, createInertiaApp } from '@inertiajs/react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { forwardRef } from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'

const LinkBehavior = forwardRef((props, ref) => {
  // @ts-ignore
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  // @ts-ignore
  return <Link ref={ref} href={href} {...other} />
})

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiLink: {
      defaultProps: {
        // @ts-ignore
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
})

function capitalizeFilename(path: string) {
  const parts = path.split('/')
  const filename = parts[parts.length - 1]
  if (!filename) return ''

  parts[parts.length - 1] = filename[0].toUpperCase() + filename.slice(1)

  return parts.join('/')
}

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    const page: any = pages[`./Pages/${capitalizeFilename(name)}.tsx`]

    page.default.layout ??= ((page: any) => <DefaultLayout children={page} />)

    return page
  },
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App {...props} />
      </ThemeProvider>,
    )
  },
  progress: {
    color: '#4B5563',
  },
})

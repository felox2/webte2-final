import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { AlertColor, Snackbar } from '@mui/material'
import { createContext, forwardRef, useState } from 'react'

interface SnackbarContextProps {
  triggerSnackbar: (message: string, severity: AlertColor) => void
}

interface SnackbarState {
  isOpen: boolean
  message: string
  severity?: AlertColor
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const SnackbarContext = createContext<SnackbarContextProps>({ triggerSnackbar: () => {} })

// TODO: Only supports one snackbar at a time, could be improved to multiple snackbars
// problem is that the provider gets re-rendered and the state is reset
// (so the array of snackbars is always empty), idk why and don't care for now
export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    isOpen: false,
    message: '',
  })

  const closeSnackbar = () => {
    setSnackbarState((prevState) => ({
      isOpen: false,
      message: '',
      severity: prevState.severity,
    }))
  }

  const triggerSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarState({
      isOpen: true,
      message,
      severity,
    })
  }

  return (
    <SnackbarContext.Provider value={{ triggerSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.isOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3500}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarState.severity}
          sx={{ width: '100%' }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export default SnackbarContext

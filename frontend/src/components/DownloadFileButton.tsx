import { Box, Button, CircularProgress, SxProps, Theme } from "@mui/material"
import { useState } from "react"

interface Props {
  resourceCallback: () => Promise<Blob>,
  children?: React.ReactNode,
  filename?: string,
  sx?: SxProps<Theme>
}

export default function DownloadFileButton({ resourceCallback, children, filename, sx }: Props) {
  const [isDisabled, setIsDisabled] = useState(false)

  const downloadFile = async () => {
    const blob = await resourceCallback()

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename ?? 'file'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const handleButtonClick = () => {
    setIsDisabled(true)
    downloadFile()
      .finally(() => setIsDisabled(false))
  }

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <Button
        variant='outlined'
        disabled={isDisabled}
        onClick={handleButtonClick}
      >
        {children}
      </Button>
      {isDisabled && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  )
}

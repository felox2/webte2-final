import { AuthContext } from '@/components/AuthProvider'
import DownloadFileButton from '@/components/DownloadFileButton'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { ky } from '@/utils/ky'
import { Roles } from '@/utils/roles'
import { Container, Stack, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import ReactMarkdown from 'react-markdown'

function getMarkdownUri(role: Roles|undefined) {
  switch (role) {
    case Roles.Admin:
      return 'docs/admin'
    case Roles.Teacher:
      return 'docs/teacher'
    case Roles.Student:
      return 'docs/student'
  }
  return null
}

export default function UserGuide() {
  const auth = useContext(AuthContext)
  const [markdown, setMarkdown] = useState<string|null>(null)

  const uri = getMarkdownUri(auth.user?.role)

  useEffectOnce(() => {
    if (uri === null) {
      return
    }

    ky.get(uri, { headers: { Accept: 'text/markdown' } })
      .text()
      .then(setMarkdown)
  })

  const downloadPdfFile = async () => {
    if (uri === null) {
      throw new Error('Cannot download PDF file')
    }
    const headers = { accept: 'application/pdf' }
    const response = await ky.get(uri, { headers })
    return await response.blob()
  }

  return (
    <Container>
      <Stack
        direction='column'
        spacing={2}
        marginY={4}
      >
        <DownloadFileButton
          resourceCallback={downloadPdfFile}
          filename='user-guide.pdf'
          sx={{ alignSelf: 'end' }}
        >
          <FormattedMessage id='guide.labels.button.export.pdf' />
        </DownloadFileButton>
        {markdown ?
          <ReactMarkdown>{markdown}</ReactMarkdown> :
          <Typography variant='h4' align='center'>Guide is not available</Typography>
        }
      </Stack>
    </Container>
  )
}

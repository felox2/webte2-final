import UsersTable from '@/components/UsersTable'
import { Container, Stack } from '@mui/material'
import { Title } from '@/components/Title'

export default function Users() {

  return (
    <Container>
      <Title text='Users' />
      <Stack
        direction='column'
        spacing={2}
        marginY={4}
      >
        <UsersTable />
      </Stack>
    </Container>
  )
}

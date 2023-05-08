import PermissionGate from '@/components/PermissionGate'
import StudentsTable from '@/components/StudentsTable'
import { Roles } from '@/utils/roles'
import { Box, Typography } from '@mui/material'
import Assignments from '@/components/Assignments'

export default function Dashboard() {
  return (
    <>
      <PermissionGate roles={[Roles.Teacher]}>
        <Box mt={2}>
          <Typography variant='h4'>Hey Im the teacher</Typography>
        </Box>
        <StudentsTable />
      </PermissionGate>

      <PermissionGate roles={[Roles.Student]}>
        <Assignments />
      </PermissionGate>
    </>
  )
}

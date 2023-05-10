import { useEffectOnce } from '@/hooks/useEffectOnce'
import { Assignment, AssignmentGroup, ResponseBody, Student } from '@/types/api'
import { stringAvatar } from '@/utils/avatar'
import { ky } from '@/utils/ky'
import { Avatar, Button, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'

import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

interface Data {
  student: Student
  assignmentGroups: ResponseBody<AssignmentGroup>
}

interface AssignmentExtras extends Assignment {
  filename: string,
  exercise_id: number | null,
  points: number | null,
}

function AssignmentCard({
  assignment,
  index,
  groupId
}:
{
  assignment: AssignmentExtras,
  index: number,
  groupId: number
}) {
  const navigate = useNavigate()

  const isGenerated = assignment.exercise_id !== null
  const isSubmitted = assignment.points !== null
  const isCorrect = assignment.points === parseFloat(assignment.max_points)

  return (
    <Paper sx={{ margin: '0.5rem' }}>
      <Stack direction='column' padding={2} spacing={2} justifyContent='space-between'>
        <Typography variant='subtitle1'>{`${index}. ${assignment.filename}`}</Typography>
        {isGenerated ? (
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            {isSubmitted ? (
              <Stack direction='row' spacing={1}>
                <Typography variant='body1'>{`${assignment.points}/${assignment.max_points}`}</Typography>
                {isCorrect ? <CheckIcon /> : <CloseIcon />}
              </Stack>
            ) :
              <Typography variant='body1'>Not submitted</Typography>}
            <Button
              variant='contained'
              color='primary'
              // TODO redirect to a custom submission page, not the assignment page
              onClick={() => navigate(`/assignment/${groupId}`)}
            >
              View
            </Button>
          </Stack>
        ) :
          <Typography variant='h6' align='center'>Not generated</Typography>}
      </Stack>
    </Paper>
  )
}

function AssignmentGroup(assignmentGroup: AssignmentGroup) {
  return (
    <Paper variant='outlined'>
      <Stack direction='column' padding={2} spacing={2}>
        <Stack direction='row' justifyContent='space-between' marginX={1}>
          <div>
            <Typography variant='h4'>{assignmentGroup.title}</Typography>
            <Typography variant='body1'>{assignmentGroup.description}</Typography>
          </div>
          <div>
            <Typography variant='body1' align='right'>
              {/* TODO: Translate */}
              {`Max. points: ${assignmentGroup.max_points}`}
            </Typography>
            <Typography variant='body1' align='right'>
              {/* TODO: Translate */}
              {`Created: ${assignmentGroup.created_at}`}
            </Typography>
            <Typography variant='body1' align='right'>
              {/* TODO: Translate */}
              {`Active: ${assignmentGroup.start_date.slice(0, 10)} - ${assignmentGroup.end_date?.slice(0, 10) || '∞'}`}
            </Typography>
          </div>
        </Stack>
        <Grid container>
          {assignmentGroup.assignments.map((assignment, index) => (
            <Grid item xs={12} sm={6} md={3}>
              <AssignmentCard key={assignment.id} assignment={assignment as AssignmentExtras} index={index + 1} groupId={assignmentGroup.id} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Paper>
  )
}

export default function Student() {
  const { id } = useParams<{ id: string }>()

  const [student, setStudent] = useState<Student>()
  const [assignmentGroups, setAssignmentGroups] = useState<ResponseBody<AssignmentGroup>>()

  useEffectOnce(() => {
    ky.get(`students/${id}`)
      .json<Data>()
      .then(data => {
        setStudent(data.student)
        setAssignmentGroups(data.assignmentGroups)
      })
      .catch(console.error)
  })

  return (
    <Container>
      <Stack direction='row' alignItems='center'>
        <Avatar {...stringAvatar(`${student?.first_name} ${student?.last_name}`)} />
        <Stack margin={2} direction='column'>
          <Typography variant='h5'>{student?.first_name} {student?.last_name}</Typography>
          <Typography variant='body1'>{student?.email}</Typography>
        </Stack>
        <Typography
          variant='h6'
          alignSelf='flex-end'
          sx={{ marginLeft: 'auto', paddingY: '0.5rem' }}
        >
          <FormattedMessage id='student.banner.assignmentCount' values={{ count: assignmentGroups?.total ?? '-' }} />
        </Typography>
      </Stack>

      <Divider sx={{ marginTop: '0' }} />

      <Stack direction='column' spacing={2} marginY={2}>
        {assignmentGroups?.items.map((assignmentGroup) => <AssignmentGroup key={assignmentGroup.id} {...assignmentGroup} />)}
      </Stack>
    </Container>
  )
}

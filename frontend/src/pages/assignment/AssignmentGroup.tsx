import { useMemo, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Assignment, AssignmentGroup, Submission } from '@/types/api'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { ky } from '@/utils/ky'
import { useParams } from 'react-router-dom'
import Latex from '@/components/Latex'
import dayjs from 'dayjs'
import MathInput from '@/components/MathInput'
import Button from '@mui/material/Button'
import { FormattedMessage } from 'react-intl'

function Assignment({ assignment, handleSubmitResponse, index, endDate }: {
  assignment: Assignment,
  index: number,
  endDate: dayjs.Dayjs | null,
  handleSubmitResponse?: (data: any) => void
}) {
  const [solution, setSolution] = useState('')
  const submission = useMemo(() => assignment.submissions[0], [assignment])

  const canSubmit = useMemo(() =>
      !submission?.provided_solution && (endDate ? endDate.isAfter(dayjs()) : true),
    [submission, endDate])

  function handleMathInput(value: string) {
    setSolution(value)
  }

  function handleSubmit() {
    ky.post(`submissions/${submission.id}/submit`, {
      json: { solution },
    }).json()
      .then((res) => {
        handleSubmitResponse?.(res)
      })
  }

  return (
    <Box>
      {submission.exercise && (
        <Box mt={2}>
          <Typography variant='h5'>
            <FormattedMessage id='submissions.task' values={{
              number: index + 1,
              points: submission.points ?? '?',
              maxPoints: assignment.max_points,
            }} />
          </Typography>
          <Latex text={submission.exercise.task} />
        </Box>
      )}

      {submission.exercise?.solution && (
        <Box mt={2}>
          <Typography variant='h5'>
            <FormattedMessage id='submissions.solution' />
          </Typography>
          <Latex text={`$$${submission.exercise.solution}$$`} />
        </Box>
      )}

      {submission.provided_solution && (
        <Box mt={2}>
          <Typography variant='h5'>
            <FormattedMessage id='submissions.providedSolution' />
          </Typography>
          <Latex text={`$$${submission.provided_solution}$$`} />
        </Box>
      )}

      {canSubmit && (
        <Stack display='flex' flexDirection='row' width='100%' direction='row' spacing={1} my={2}>
          <MathInput value={solution} onChange={handleMathInput} />
          <Button variant='contained' onClick={handleSubmit}>
            <FormattedMessage id='submit' />
          </Button>
        </Stack>
      )}
    </Box>
  )
}

export default function AssignmentGroup() {
  const { id } = useParams()
  const [assignmentGroup, setAssignmentGroup] = useState<AssignmentGroup | null>(null)
  const endDate = useMemo(() =>
      assignmentGroup?.end_date ? dayjs.utc(assignmentGroup.end_date).local() : null,
    [assignmentGroup])

  useEffectOnce(() => {
    ky.post(`assignment-groups/${id}`)
      .json()
      .then((res) => {
        const data = res as AssignmentGroup

        setAssignmentGroup(data)
      })
  })

  function updateSubmission(data: Submission) {
    setAssignmentGroup((prev) => {
      return {
        ...prev!,
        assignments: prev!.assignments.map((assignment) => {
          if (assignment.id === data.assignment_id) {
            return {
              ...assignment,
              submissions: [data],
            }
          }

          return assignment
        }),
      }
    })
  }

  return assignmentGroup ? (
    <Box mb={8}>
      <div>
        <Typography variant='h4'>{assignmentGroup.title}</Typography>
        <Typography variant='body1'>{assignmentGroup.description}</Typography>
      </div>

      <div>
        <Typography>{'?'}/{assignmentGroup.max_points}</Typography>
        <Typography>{assignmentGroup.end_date}</Typography>
      </div>

      {assignmentGroup.assignments.map((assignment, index) => (
        <Assignment
          key={assignment.id}
          assignment={assignment}
          endDate={endDate}
          index={index}
          handleSubmitResponse={updateSubmission}
        />
      ))}
    </Box>
  ) : (
    <Box>
      <Typography variant='h4'>Loading...</Typography>
    </Box>
  )
}

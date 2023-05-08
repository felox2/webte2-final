import { useMemo, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Submission } from '@/types/api'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { ky } from '@/utils/ky'
import { useParams } from 'react-router-dom'
import Latex from '@/components/Latex'
import dayjs from 'dayjs'
import MathInput from '@/components/MathInput'
import Button from '@mui/material/Button'
import { FormattedMessage } from 'react-intl'

export default function Submission() {
  const { id } = useParams()
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [solution, setSolution] = useState('')

  const endDate = useMemo(() => submission?.assignment.end_date ? dayjs.utc(submission.assignment.end_date).local() : null, [submission?.assignment])
  const canSubmit = useMemo(() =>
      !submission?.provided_solution && (endDate ? endDate.isAfter(dayjs()) : true),
    [submission, endDate])

  useEffectOnce(() => {
    ky.post(`submissions/${id}`)
      .json()
      .then((res) => {
        const data = res as Submission

        setSubmission(data)
      })
  })

  function handleMathInput(value: string) {
    setSolution(value)
  }

  function handleSubmit() {
    ky.post(`submissions/${id}/submit`, {
      json: { solution },
    }).json()
      .then((res) => {
        const data = res as Submission

        setSubmission(data)
      })
  }

  return submission ? (
    <Box>
      <Box>
        <div>
          <Typography variant='h4'>{submission.assignment.title}</Typography>
          <Typography variant='body1'>{submission.assignment.description}</Typography>
        </div>

        <div>
          <Typography>{submission.points ?? '?'}/{submission.assignment.max_points}</Typography>
          <Typography>{submission.assignment.end_date}</Typography>
        </div>
      </Box>

      {submission.exercise && (
        <Box mt={2}>
          <Typography variant='h5'>
            <FormattedMessage id='submissions.task' />
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
        <Stack display='flex' flexDirection='row' width='100%' direction='row' spacing={2}>
          <MathInput value={solution} onChange={handleMathInput} />
          <Button variant='contained' onClick={handleSubmit}>
            <FormattedMessage id='submit' />
          </Button>
        </Stack>
      )}
    </Box>
  ) : (
    <Box>
      <Typography variant='h4'>Loading...</Typography>
    </Box>
  )
}

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { ResponseBody, Student, Submission } from '@/types/api'
import { stringAvatar } from '@/utils/avatar'
import { ky } from '@/utils/ky'
import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useParams } from 'react-router-dom'

interface Data {
  student: Student
  submissions: ResponseBody<Submission>
}

export default function Student() {
  const { id } = useParams<{ id: string }>()

  const [student, setStudent] = useState<Student>()
  const [submissions, setSubmissions] = useState<ResponseBody<Submission>>()

  useEffectOnce(() => {
    ky.get(`students/${id}`)
      .json<Data>()
      .then(data => {
        console.log(data)
        setStudent(data.student)
        setSubmissions(data.submissions)
      })
      .catch(console.error)
  })

  return (
    <>
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
          <FormattedMessage id='student.banner.assignmentCount' values={{ count: submissions?.total }} />
        </Typography>
      </Stack>

      <Divider sx={{ marginTop: '0' }} />

      <Stack direction='column' spacing={2} marginTop={2}>
        <Typography variant='h2'>TODO pre Lubosa: dorobit</Typography>
        <Paper>
          <Typography variant='h6' padding={2}>Vygenerove ulohy</Typography>
          {submissions?.items.filter(submission => submission.exercise_id !== null).map(submission => (
            <Typography>{submission.assignment.title}</Typography>
          ))}
        </Paper>

        <Paper>
          <Typography variant='h6' padding={2}>Odovzdane</Typography>
          {submissions?.items.filter(submission => submission.provided_solution !== null).map(submission => (
            <Typography>{submission.assignment.title}</Typography>
          ))}
        </Paper>
      </Stack>
    </>
  )
}

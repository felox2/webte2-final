import { useState } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { ky } from '@/utils/ky'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { FormattedMessage } from 'react-intl'
import { Submission } from '@/types/api'

function AssignmentCard({ submission }: { submission: Submission }) {
  return (
    <Card>
      <CardActionArea href={`/submission/${submission.id}`}>
        <CardContent>
          <Typography variant='h5'>
            {submission.assignment.title}
          </Typography>
          <Typography variant='body1'>
            {submission.assignment.description}
          </Typography>

          <Typography>
            {submission.assignment.end_date}
          </Typography>

          <Typography>
            {submission.points ?? '?'}/{submission.assignment.max_points}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default function Assignments() {
  const [currentAssignments, setCurrentAssignments] = useState<Submission[]>([])
  const [pastAssignments, setPastAssignments] = useState<Submission[]>([])

  useEffectOnce(() => {
    ky.get('submissions').json()
      .then((res) => {
        const data = res as { past: Submission[], current: Submission[] }

        setCurrentAssignments(data.current)
        setPastAssignments(data.past)
      })
  })

  return (
    <>
      <Typography variant='h4'>
        <FormattedMessage id='assignments.current' />
      </Typography>
      <Grid container spacing={2}>
        {currentAssignments?.length > 0 ? currentAssignments.map(submission => (
          <Grid item key={submission.id} xs={12} xl={4}>
            <AssignmentCard submission={submission} />
          </Grid>
        )) : (
          <Grid item xs={12}>
            <Typography variant='body1'>
              <FormattedMessage id='assignments.noCurrentAssignments' />
            </Typography>
          </Grid>
        )}
      </Grid>

      <Typography variant='h4' mt={2}>
        <FormattedMessage id='assignments.past' />
      </Typography>
      <Grid container spacing={2}>
        {pastAssignments.map(submission => (
          <Grid item key={submission.id} xs={12} xl={4}>
            <AssignmentCard submission={submission} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

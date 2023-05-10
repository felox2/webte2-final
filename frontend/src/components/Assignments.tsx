import { useMemo, useState } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { ky } from '@/utils/ky'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { FormattedMessage } from 'react-intl'
import { Submission, AssignmentGroup, Assignment } from '@/types/api'

function AssignmentCard({ assignmentGroup }: { assignmentGroup: AssignmentGroup }) {
  // const submission = assignment.submissions[0]
  const points = useMemo(() => {
    let points = 0

    for (const assignment of assignmentGroup.assignments) {
      const assignmentPoints = assignment.submissions[0].points

      if (!assignmentPoints) {
        return '?'
      }

      points += parseFloat(assignmentPoints)
    }

    return points
  }, [assignmentGroup])

  return (
    <Card>
      <CardActionArea href={`/assignment/${assignmentGroup.id}`}>
        <CardContent>
          <Typography variant='h5'>
            {assignmentGroup.title}
          </Typography>
          <Typography variant='body1'>
            {assignmentGroup.description}
          </Typography>

          <Typography>
            {assignmentGroup.end_date}
          </Typography>

          <Typography>
            {points}/{assignmentGroup.max_points}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default function Assignments() {
  const [currentAssignments, setCurrentAssignments] = useState<AssignmentGroup[]>([])
  const [pastAssignments, setPastAssignments] = useState<AssignmentGroup[]>([])

  useEffectOnce(() => {
    ky.get('assignment-groups').json()
      .then((res) => {
        const data = res as { past: AssignmentGroup[], current: AssignmentGroup[] }

        setCurrentAssignments(data.current)
        setPastAssignments(data.past)
      })
  })

  return (
    <Container>
      <Typography variant='h4'>
        <FormattedMessage id='assignments.current' />
      </Typography>
      <Grid container spacing={2}>
        {currentAssignments?.length > 0 ? currentAssignments.map(assignmentGroup => (
          <Grid item key={assignmentGroup.id} xs={12} xl={4}>
            <AssignmentCard assignmentGroup={assignmentGroup} />
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
        {pastAssignments.map(assignmentGroup => (
          <Grid item key={assignmentGroup.id} xs={12} xl={4}>
            <AssignmentCard assignmentGroup={assignmentGroup} />
          </Grid>),
        )}
      </Grid>
    </Container>
  )
}

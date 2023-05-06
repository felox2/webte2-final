import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import Table from '@mui/material/Table'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

interface Data {
  id: number
  firstname: string
  lastname: string
  generatedAssignmentCount: number
  handedInAssignmentCount: number
  earnedPointCount: number
  totalPointCount: number
  successRate: number
}

interface HeadCell {
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    label: 'tables.headers.students.studentid',
  },
  {
    id: 'lastname',
    numeric: false,
    label: 'tables.headers.students.lastname',
  },
  {
    id: 'firstname',
    numeric: false,
    label: 'tables.headers.students.firstname',
  },
  {
    id: 'generatedAssignmentCount',
    numeric: true,
    label: 'tables.headers.students.generatedAssignmentCount',
  },
  {
    id: 'handedInAssignmentCount',
    numeric: true,
    label: 'tables.headers.students.handedInAssignmentCount',
  },
  {
    id: 'earnedPointCount',
    numeric: true,
    label: 'tables.headers.students.earnedPointCount',
  },
  {
    id: 'totalPointCount',
    numeric: true,
    label: 'tables.headers.students.totalPointCount',
  },
  {
    id: 'successRate',
    numeric: true,
    label: 'tables.headers.students.successRate',
  },
]

const fakeData: Data[] = [
  {
    id: 1,
    firstname: 'Janko',
    lastname: 'Hraško',
    generatedAssignmentCount: 3,
    handedInAssignmentCount: 5,
    earnedPointCount: 20,
    totalPointCount: 30,
    successRate: 0.66,
  },
  {
    id: 2,
    firstname: 'Samko',
    lastname: 'Rozko',
    generatedAssignmentCount: 10,
    handedInAssignmentCount: 5,
    earnedPointCount: 20,
    totalPointCount: 30,
    successRate: 0.66,
  },
  {
    id: 3,
    firstname: 'Zuzka',
    lastname: 'Ferko',
    generatedAssignmentCount: 33,
    handedInAssignmentCount: 5,
    earnedPointCount: 20,
    totalPointCount: 30,
    successRate: 0.66,
  },
]

export default function StudentsTable() {
  const navigate = useNavigate()
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, headCell.id)}>
                      <FormattedMessage id={headCell.label} />
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {fakeData.map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  onClick={() => navigate(`/student/${row.id}`)}
                  sx={{ cursor: 'pointer' }}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell>{row.lastname}</TableCell>
                  <TableCell>{row.firstname}</TableCell>
                  <TableCell align='right'>{row.generatedAssignmentCount}</TableCell>
                  <TableCell align='right'>{row.handedInAssignmentCount}</TableCell>
                  <TableCell align='right'>{row.earnedPointCount}</TableCell>
                  <TableCell align='right'>{row.totalPointCount}</TableCell>
                  <TableCell align='right'>{row.successRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={fakeData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10))
            setPage(0)
          }}
        />
      </Paper>
    </Box>
  )
}

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
import { ky } from '@/utils/ky'
import { ResponseBody, Student } from '@/types/api'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useLoading } from './LoadingProvider'
import {User} from "@/components/AuthProvider";

import DeleteIcon from '@mui/icons-material/Delete'
import RoleIcon from '@mui/icons-material/ChangeCircle'

interface Items extends User {
  action:any
}

interface HeadCell {
  id: keyof Items
  label: string
  numeric: boolean
}

type Data = ResponseBody<User>

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    label: 'admin.table.labels.userId',
  },
  {
    id: 'last_name',
    numeric: false,
    label: 'tables.headers.students.lastname',
  },
  {
    id: 'first_name',
    numeric: false,
    label: 'tables.headers.students.firstname',
  },
  {
    id: 'email',
    numeric: true,
    label: 'auth.login.email',
  },
  {
    id: 'role',
    numeric: true,
    label: 'admin.table.labels.role',
  },
  {
    id: 'action',
    numeric: true,
    label: 'admin.table.labels.action',
  },
]

const fetchUsers = async (page: number, rowsPerPage: number, sort: keyof Items, order: 'asc' | 'desc'): Promise<Data> => {
  const searchParams = { page: page + 1, size: rowsPerPage, sort, order }
  const response = await ky.get('users', { searchParams })
  return await response.json()
}



export default function UserTable() {
  const navigate = useNavigate()
  const { loading, setLoading } = useLoading()

  const [data, setData] = useState<Data>({ items: [], total: 0 })
  const [order, setOrder] = useState<'asc'|'desc'>('asc')
  const [orderBy, setOrderBy] = useState<keyof Items>('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffectOnce(() => {
    setLoading(true)
    fetchUsers(page, rowsPerPage, orderBy, order)
      .then((data) => setData(data))
      .catch((error) => console.error('Fetch error: ', error))
      .finally(() => setLoading(false))
  })


  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Items) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)

    fetchUsers(page, rowsPerPage, orderBy, order)
      .then((data) => setData(data))
      .catch((error) => console.error('Fetch error: ', error))
  }

  const deleteUser = async (id: number)=> {
    const searchParams = {id: id}
    await ky.delete('users', {searchParams})

    fetchUsers(page, rowsPerPage, orderBy, order)
      .then((data) => setData(data))
      .catch((error) => console.error('Fetch error: ', error))
  }

  const changeUserRole = async (id: number)=> {
    const searchParams = {id: id}
    await ky.put('users', {searchParams})

    fetchUsers(page, rowsPerPage, orderBy, order)
      .then((data) => setData(data))
      .catch((error) => console.error('Fetch error: ', error))
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
              {data.items.map((row) => (
                <TableRow
                  hover
                  key={row.id}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role=="student"?
                    <FormattedMessage id='admin.table.labels.role.student' />:
                    <FormattedMessage id='admin.table.labels.role.teacher' />}
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => deleteUser(row.id)}/>
                    <RoleIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => changeUserRole(row.id)}/>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={data.total}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={<FormattedMessage id='tables.footers.students.rowsPerPage' />}
          labelDisplayedRows={({ from, to, count }) => <FormattedMessage id='tables.footers.students.rows' values={{ from, to, count }} />}
          page={page}
          onPageChange={(event, newPage: number) => {
            setPage(newPage)

            fetchUsers(page, rowsPerPage, orderBy, order)
              .then((data) => setData(data))
              .catch((error) => console.error('Fetch error: ', error))
          }}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10))
            setPage(0)

            fetchUsers(page, rowsPerPage, orderBy, order)
              .then((data) => setData(data))
              .catch((error) => console.error('Fetch error: ', error))
          }}
        />
      </Paper>
    </Box>
  )
}

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Student from './pages/Student'
import DefaultLayout from '@/layouts/DefaultLayout'
import GuestLayout from '@/layouts/GuestLayout'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import GuardedRoute from '@/components/GuardedRoute'
import { Roles } from './utils/roles'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/auth' element={<GuestLayout />}>
        <Route element={<GuardedRoute guest redirectRoute={'/'} />}>
          <Route id='login' path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Route>

      <Route path='/' element={<DefaultLayout />}>
        <Route element={<GuardedRoute redirectRoute={'/auth/login'} />}>
          <Route index element={<Dashboard />} />

          <Route element={<GuardedRoute roles={[Roles.Teacher]} redirectRoute={'/'} />}>
            <Route path='student/:id' element={<Student />} />
          </Route>

        </Route>
      </Route>
    </>,
  ), {
    basename: '/final',
  },
)

export default router

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Student from './pages/Student'
import DefaultLayout from '@/layouts/DefaultLayout'
import GuestLayout from '@/layouts/GuestLayout'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import GuardedRoute from '@/components/GuardedRoute'
import { Roles } from './utils/roles'
import Assigning from './pages/Assigning'
import Submission from '@/pages/submissions/Submission'

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

          <Route path='submission/:id' element={<Submission />} />

          <Route element={<GuardedRoute roles={[Roles.Teacher, Roles.Admin]} redirectRoute={'/'} />}>
            <Route path='student/:id' element={<Student />} />
            <Route path='assigning' element={<Assigning />} />
          </Route>

        </Route>
      </Route>
    </>,
  ), {
    basename: import.meta.env.BASE_URL,
  },
)

export default router

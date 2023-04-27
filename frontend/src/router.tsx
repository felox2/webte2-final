import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import DefaultLayout from '@/layouts/DefaultLayout'
import GuestLayout from '@/layouts/GuestLayout'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import GuardedRoute from '@/components/GuardedRoute'

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
        </Route>
      </Route>
    </>,
  ),
)

export default router

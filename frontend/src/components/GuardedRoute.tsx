// https://javascript.plainenglish.io/how-to-create-guarded-routes-using-react-router-d83f0cffccfc
import { Navigate, Outlet, To } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '@/components/AuthProvider'

interface GuardedRouteProps {
  guest?: boolean;
  /**
   * Route to be redirected to
   * @default '/'
   */
  redirectRoute?: To;
}

/**
 * Component for guarding restricted routes
 *
 * @example Default usage
 * ```ts
 * <GuardedRoute
 *   isRouteAccessible={true}
 * />
 * ```
 *
 * @example Usage with custom redirected route
 * ```ts
 * <GuardedRoute
 *   isRouteAccessible={false}
 *   redirectRoute={'/login'}
 * />
 * ```
 */
function GuardedRoute({ guest, redirectRoute }: GuardedRouteProps) {
  const auth = useContext(AuthContext)
  const isAccessible = guest ? !auth.user : !!auth.user

  return isAccessible ? <Outlet /> : <Navigate to={redirectRoute || '/'} replace={true} />
}

export default GuardedRoute

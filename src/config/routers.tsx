import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import AuthenticatedGuard from '../guards/AuthenticatedGuard'
import PublicGuard from '../guards/PublicGuard'
import { Suspense, lazy } from 'react'
import { Loading } from '../components'
import { PATH } from '../constants'
import MainLayout from '../layouts/MainLayout/MainLayout'

// const Login = lazy(() => import('./modules/Login/Login'))
// const Register = lazy(() => import('./modules/Register/Register'))
const Home = lazy(() => import('../modules/home/Home'))

const RouterConfig = () =>
  useRoutes([
    {
      path: PATH.LOGIN,
      element: (
        <PublicGuard>
          {/* <Login /> */}
          <p>Login</p>
        </PublicGuard>
      )
    },
    {
      path: PATH.REGISTER,
      element: (
        <PublicGuard>
          {/* <Register /> */}
          <p>reg</p>
        </PublicGuard>
      )
    },
    {
      path: PATH.FORGOT_PASSWORD,
      element: (
        <PublicGuard>
          {/* <ForgotPassword /> */}
          <p>ForgotPassword</p>
        </PublicGuard>
      )
    },
    {
      path: PATH.RESET_PASSWORD,
      element: (
        <PublicGuard>
          {/* <ResetPassword /> */}
          <p>ResetPassword</p>
        </PublicGuard>
      )
    },
    {
      path: PATH.ANY,
      element: <h1>404 NOT FOUND!!!</h1>
    },
    {
      path: PATH.HOME,
      element: (
        <AuthenticatedGuard>
          <MainLayout />
        </AuthenticatedGuard>
      ),
      children: [
        {
          path: PATH.HOME,
          element: <Home />
        },
        {
          path: PATH.PROFILE,
          element: <p>Profile</p>
        }
      ]
    }
  ])

export const RoutesManager = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <RouterConfig />
      </Suspense>
    </BrowserRouter>
  )
}

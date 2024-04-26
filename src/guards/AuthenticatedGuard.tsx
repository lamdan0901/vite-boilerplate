import { ReactNode, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { PATH } from '../constants/paths'

interface Props {
  children: ReactNode
}

function getToken() {
  return 1
}

const AuthenticatedGuard = ({ children }: Props) => {
  const location = useLocation()
  // const { data: currentUser } = useGetCurrentUserQuery(
  //   !getToken() ? skipToken : undefined
  // )

  useEffect(() => {
    // if (getToken()) dispatch(setCurrentUser(currentUser))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return getToken() ? (
    <>{children}</>
  ) : (
    <Navigate to={PATH.LOGIN} replace state={{ from: location }} />
  )
}

export default AuthenticatedGuard

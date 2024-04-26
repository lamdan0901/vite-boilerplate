import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { PATH } from '../constants/paths'

interface Props {
  children: ReactNode
}

function getToken() {
  return 1
}

const PublicGuard = ({ children }: Props) => {
  const location = useLocation()

  return !getToken() ? (
    <>{children}</>
  ) : (
    <Navigate to={PATH.HOME} replace state={{ from: location }} />
  )
}

export default PublicGuard

import React, { ReactNode } from "react"
import "./AuthLayout.scss"

interface Props {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-content">{children}</div>
    </div>
  )
}
export default AuthLayout

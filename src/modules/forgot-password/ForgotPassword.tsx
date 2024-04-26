import "../Login/Login.scss"

import { Button, Form, Input, message } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { usePostInitResetPasswordMutation } from "../../apis/authSlice"
import { REGEX_EMAIL } from "../../constants"
import { PATH } from "../../constants/paths"
import AuthLayout from "../../layouts/AuthLayout/AuthLayout"

const ForgotPassword = () => {
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()
  const [postInitResetPassword, { status }] = usePostInitResetPasswordMutation()

  const onSubmit = async ({ email }) => {
    try {
      await postInitResetPassword(email).unwrap()

      message.success(
        "Vui lòng kiểm tra key xác nhận đã được gửi về mail của bạn!"
      )
      navigate(PATH.RESET_PASSWORD)
    } catch (err: any) {
      setErrorMsg(err?.data?.title)
    }
  }

  return (
    <AuthLayout>
      <Form onFinish={onSubmit} autoComplete="off">
        <h2 className="title">Quên mật khẩu</h2>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!"
            },
            {
              pattern: new RegExp(REGEX_EMAIL),
              message: "Email không hợp lệ!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <p>
          Đã có tài khoản? <Link to={PATH.LOGIN}>Đăng nhập ngay</Link>
        </p>
        <p className="error-message">{errorMsg}</p>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={status === "pending"}
        >
          Xác nhận
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default ForgotPassword

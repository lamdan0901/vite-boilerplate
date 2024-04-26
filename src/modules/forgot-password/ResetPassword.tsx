import "../Login/Login.scss"

import { Button, Form, Input, message } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { usePostFinishResetPasswordMutation } from "../../apis/authSlice"
import { PATH } from "../../constants/paths"
import AuthLayout from "../../layouts/AuthLayout/AuthLayout"

const ResetPassword = () => {
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()
  const [postFinishResetPassword, { status }] =
    usePostFinishResetPasswordMutation()

  const onSubmit = async ({ key, newPassword, confirmNewPassword }) => {
    if (newPassword !== confirmNewPassword) {
      setErrorMsg("Mật khẩu không trùng khớp, vui lòng thử lại")
      return
    }

    try {
      await postFinishResetPassword({ key, newPassword }).unwrap()

      message.success("Tạo mật khẩu mới thành công!")
      navigate(PATH.LOGIN)
    } catch (err: any) {
      setErrorMsg(err?.data?.title)
    }
  }

  return (
    <AuthLayout>
      <Form
        onFinish={onSubmit}
        labelCol={{
          span: 9
        }}
        wrapperCol={{
          span: 20
        }}
        autoComplete="off"
      >
        <h2 className="title">Tạo mật khẩu mới</h2>
        <Form.Item
          label="Key xác nhận"
          name="key"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập key xác nhận!"
            }
          ]}
        >
          <Input placeholder="Nhập key xác nhận" autoComplete="false" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!"
            }
          ]}
        >
          <Input.Password
            placeholder=" Nhập mật khẩu mới"
            autoComplete="false"
          />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmNewPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu mới!"
            }
          ]}
        >
          <Input.Password
            placeholder=" Xác nhận mật khẩu mới"
            autoComplete="false"
          />
        </Form.Item>
        <p>
          Chưa nhận được key xác nhận? <Link to="/#">Gửi lại</Link>
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

export default ResetPassword

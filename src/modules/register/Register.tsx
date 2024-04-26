import "../Login/Login.scss"

import { Button, Form, Input, message } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { usePostRegisterMutation } from "../../apis/authSlice"
import { REGEX_EMAIL, REGEX_PASSWORD } from "../../constants"
import { PATH } from "../../constants/paths"
import AuthLayout from "../../layouts/AuthLayout/AuthLayout"

const Register = () => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("")
  const [postRegister, { status }] = usePostRegisterMutation()

  const onSubmit = async payload => {
    if (payload.password !== payload.confirmPassword) {
      setErrorMsg("Mật khẩu không trùng khớp, vui lòng thử lại")
      return
    }

    try {
      await postRegister(payload).unwrap()

      message.success(
        "Đăng kí tài khoản thành công! Vui lòng kiểm tra email để kích hoạt tài khoản",
        2
      )
      navigate(PATH.LOGIN)
    } catch (err: any) {
      setErrorMsg(err?.data?.title)
    }
  }

  return (
    <AuthLayout>
      <Form
        name="basic"
        labelCol={{
          span: 6
        }}
        wrapperCol={{
          span: 20
        }}
        initialValues={{
          remember: true
        }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <h2 className="login-title">Đăng kí tài khoản</h2>
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Tên đăng nhập!"
            }
          ]}
        >
          <Input placeholder=" Nhập tên đăng nhập" />
        </Form.Item>

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
              message: "Địa chỉ email không đúng định dạng!"
            }
          ]}
        >
          <Input placeholder=" Nhập email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Mật khẩu!"
            },
            {
              pattern: new RegExp(REGEX_PASSWORD),
              message: "Mật khẩu cần có tối thiểu 5 kí tự!"
            }
          ]}
        >
          <Input.Password placeholder=" Nhập mật khẩu" autoComplete="false" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu!"
            },
            {
              pattern: new RegExp(REGEX_PASSWORD),
              message: "Mật khẩu cần có tối thiểu 5 kí tự!"
            }
          ]}
        >
          <Input.Password
            placeholder=" Xác nhận mật khẩu"
            autoComplete="false"
          />
        </Form.Item>

        <p className="error-message">{errorMsg}</p>
        <p>
          Đã có tài khoản?
          <Link to={PATH.LOGIN}> Đăng nhập ngay</Link>
        </p>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={status === "pending"}
        >
          Đăng kí
        </Button>
      </Form>
    </AuthLayout>
  )
}
export default Register

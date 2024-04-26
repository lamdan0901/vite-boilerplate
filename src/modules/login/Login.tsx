import "./Login.scss"

import { Button, Checkbox, Form, Input, message } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { usePostLoginMutation } from "../../apis/authSlice"
import { PATH } from "../../constants/paths"
import AuthLayout from "../../layouts/AuthLayout/AuthLayout"
import { setTempToken, setToken } from "../../utils/auth"
import { REGEX_PASSWORD } from "../../constants"

const Login = () => {
  const navigate = useNavigate()
  const [postLogin, { status }] = usePostLoginMutation()

  const [rememberMe, setRememberMe] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")

  const onSubmit = async payload => {
    try {
      const { id_token } = await postLogin({
        ...payload,
        rememberMe
      }).unwrap()

      if (rememberMe) {
        setToken(id_token)
      } else {
        setTempToken(id_token)
      }

      message.success("Đăng nhập thành công")
      navigate(PATH.HOME)
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
        onFinish={onSubmit}
        autoComplete="off"
      >
        <h2 className="login-title">Đăng nhập</h2>
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

        <p className="error-message">{errorMsg}</p>
        <Form.Item valuePropName="checked">
          <Checkbox
            name="rememberMe"
            checked={rememberMe}
            onChange={e => {
              setRememberMe(e.target.checked)
            }}
          >
            Lưu mật khẩu
          </Checkbox>
        </Form.Item>
        <p>
          <Link to={PATH.FORGOT_PASSWORD}>Quên mật khẩu?</Link>
        </p>
        <p>
          Chưa có tài khoản?
          <Link to={PATH.REGISTER}> Đăng kí ngay</Link>
        </p>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={status === "pending"}
        >
          Đăng nhập
        </Button>
      </Form>
    </AuthLayout>
  )
}
export default Login

import "./Profile.scss"

import { PageHeader } from "@ant-design/pro-layout"
import { Button, Form, Input, Layout, message, Tag } from "antd"
import { useState } from "react"

import { usePostChangePasswordMutation } from "../../apis/authSlice"
import { usePutUserMutation } from "../../apis/userSlice"
import { REGEX_PASSWORD } from "../../constants"
import { useAppSelector } from "../../store/store"

const passwordRule = {
  pattern: new RegExp(REGEX_PASSWORD),
  message: "Mật khẩu cần có tối thiểu 5 kí tự!"
}

const Profile = () => {
  const [changePasswordForm] = Form.useForm()
  const [errorMsg, setErrorMsg] = useState(() => ({
    updateProfileMsg: "",
    updatePasswordMsg: ""
  }))

  const { currentUser } = useAppSelector(state => state.app)
  const [putUser, { status: updateProfileStatus }] = usePutUserMutation()
  const [postChangePassword, { status: changePasswordStatus }] =
    usePostChangePasswordMutation()

  const handleUpdateProfile = async profileData => {
    try {
      await putUser({
        ...profileData,
        activated: true,
        authorities: currentUser?.authorities
      }).unwrap()

      message.success("Cập nhật thông tin thành công")
      setErrorMsg(prev => ({ ...prev, updateProfileMsg: "" }))
    } catch (err: any) {
      setErrorMsg(prev => ({
        ...prev,
        updateProfileMsg: err?.data?.title ?? "Có lỗi xảy ra"
      }))
    }
  }

  const handleChangePassword = async ({ currentPassword, newPassword }) => {
    try {
      await postChangePassword({ currentPassword, newPassword }).unwrap()

      message.success("Đổi mật khẩu thành công")
      setErrorMsg(prev => ({ ...prev, updatePasswordMsg: "" }))
    } catch (err: any) {
      setErrorMsg(prev => ({
        ...prev,
        updatePasswordMsg: err?.data?.title ?? "Có lỗi xảy ra"
      }))
    }

    changePasswordForm.resetFields()
  }

  return (
    <Layout.Content>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Thông tin cá nhân"
      />

      <>
        {currentUser && (
          <Form
            name="basic"
            labelCol={{
              span: 6
            }}
            wrapperCol={{
              span: 12
            }}
            onFinish={handleUpdateProfile}
            autoComplete="off"
            className="update-profile__form"
            id="profile"
          >
            <Form.Item label="ID" name="id" initialValue={currentUser.id}>
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              initialValue={currentUser.email}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Tên đăng nhập"
              name="login"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Tên đăng nhập!"
                }
              ]}
              initialValue={currentUser.login}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>

            <Form.Item
              label="Họ"
              name="firstName"
              initialValue={currentUser.firstName ?? ""}
            >
              <Input placeholder="Họ" />
            </Form.Item>

            <Form.Item
              label="Tên"
              name="lastName"
              initialValue={currentUser.lastName ?? ""}
            >
              <Input placeholder=" Tên" />
            </Form.Item>

            <Form.Item label="Vai trò">
              {currentUser.authorities?.map(item => (
                <Tag key={item}>{item}</Tag>
              ))}
            </Form.Item>

            <p className="error-message">{errorMsg.updateProfileMsg}</p>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateProfileStatus === "pending"}
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        )}

        <Form
          name="basic"
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 12
          }}
          onFinish={handleChangePassword}
          autoComplete="off"
          form={changePasswordForm}
          className="change-password__form"
          id="resetPassword"
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Mật khẩu hiện tại!"
              },
              passwordRule
            ]}
          >
            <Input.Password placeholder=" Nhập mật khẩu hiện tại" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Mật khẩu mới!"
              },
              passwordRule
            ]}
          >
            <Input.Password placeholder=" Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="confirmPassword"
            hasFeedback
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu mới!"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error("Mật khẩu mới không trùng khớp, vui lòng thử lại")
                  )
                }
              })
            ]}
          >
            <Input.Password placeholder=" Nhập lại mật khẩu mới" />
          </Form.Item>

          <p className="error-message">{errorMsg.updatePasswordMsg}</p>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={changePasswordStatus === "pending"}
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </>
    </Layout.Content>
  )
}

export default Profile

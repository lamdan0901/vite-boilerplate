import { Button, Checkbox, Form, Input, Select } from "antd"
import { PageHeader } from "@ant-design/pro-layout"
import { Link } from "react-router-dom"

import AuthLayout from "../../layouts/AuthLayout/AuthLayout"
import type { SelectProps } from "antd"
import { REGEX_EMAIL, ROLES } from "../../constants"

interface UserFormProps {
  submitForm: (user: User) => void
  user?: User
  headerText: string
  errorMsg: string
}

const UserForm = ({
  submitForm,
  user,
  headerText,
  errorMsg
}: UserFormProps) => {
  const roleOptions: SelectProps["options"] = [
    {
      label: ROLES.ADMIN,
      value: ROLES.ADMIN
    },
    {
      label: ROLES.USER,
      value: ROLES.USER
    }
  ]

  return (
    <AuthLayout>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={headerText}
      />

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={submitForm}
        autoComplete="off"
      >
        {user && (
          <Form.Item
            label="ID"
            name="id"
            initialValue={user.id ?? ""}
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
        )}

        <Form.Item
          label="Tên đăng nhập"
          name="login"
          initialValue={user?.login ?? ""}
          rules={[{ required: true, message: "Vui lòng nhập Tên đăng nhập!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Họ và tên đệm"
          name="firstName"
          initialValue={user?.firstName ?? ""}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="lastName"
          initialValue={user?.lastName ?? ""}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          initialValue={user?.email ?? ""}
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
          <Input />
        </Form.Item>

        <Form.Item
          name="activated"
          wrapperCol={{ offset: 8, span: 16 }}
          valuePropName="checked"
          initialValue={user?.activated ?? true}
        >
          <Checkbox>Activated</Checkbox>
        </Form.Item>

        <Form.Item
          name="authorities"
          label="Vai trò"
          initialValue={user?.authorities ?? [ROLES.ADMIN, ROLES.USER]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select user's role"
            options={roleOptions}
          />
        </Form.Item>

        <p className="error-message">{errorMsg}</p>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
          <Link to="..">
            <Button>Huỷ</Button>
          </Link>
        </Form.Item>
      </Form>
    </AuthLayout>
  )
}

export default UserForm

import "./Navigation.scss"

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Dropdown, Layout, Row } from "antd"
import React from "react"
import { Link, useNavigate } from "react-router-dom"

import { logOut } from "../../App/App.reducer"
import { PATH } from "../../constants/paths"
import { useAppDispatch } from "../../store/store"

import type { MenuProps } from "antd"
const { Header } = Layout

interface Props {
  collapsed: boolean
  changeCollapsed: Function
}

const Navigation = ({ collapsed, changeCollapsed }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logOut())
    navigate(PATH.LOGIN)
  }

  const items: MenuProps["items"] = [
    {
      key: "change-pass",
      label: (
        <Link className="nav-bar__option-menu-item" to="/profile">
          Thông tin cá nhân
        </Link>
      )
    },
    {
      key: "sign-out",
      label: (
        <span
          className="nav-bar__option-menu-item"
          onClick={() => handleLogout()}
        >
          Đăng xuất
        </span>
      )
    }
  ]

  return (
    <Header className="nav-header">
      <Row justify="space-between">
        <Col>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: () => changeCollapsed()
            }
          )}
        </Col>
        <Col>
          <Row justify="center">
            <Col>
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Button type="text">
                  <Avatar
                    style={{ color: "#928d8a", backgroundColor: "#d26614" }}
                  ></Avatar>
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default Navigation

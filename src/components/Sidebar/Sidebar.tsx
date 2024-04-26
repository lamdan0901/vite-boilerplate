import { Menu, Layout } from "antd"
import { Link } from "react-router-dom"
import {
  AreaChartOutlined,
  DashboardOutlined,
  UserOutlined
} from "@ant-design/icons"
import LOGO from "../../assets/images/logo.png"
import { PATH } from "../../constants/paths"
import "./Sidebar.scss"

const { Sider } = Layout

interface Props {
  collapsed: boolean
}

const Sidebar = ({ collapsed }: Props) => {
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to={PATH.HOME}>Dashboard</Link>
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to={PATH.FORGOT_PASSWORD}>Quên mật khẩu</Link>
    },
    {
      key: "sub1",
      icon: <UserOutlined />,
      label: "User Manager",
      children: [
        {
          key: "sub11",
          label: <Link to="/#">Users</Link>
        },
        {
          key: "sub12",
          label: <Link to="/#">Role & Permission</Link>
        }
      ]
    },
    {
      key: "3",
      icon: <AreaChartOutlined />,
      label: <Link to="/#">Report</Link>
    }
  ]

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={300}
      theme="light"
      className="sidebar"
    >
      <div className="sidebar__logo">
        <img src={LOGO} alt="logo cms" width={35} height={35} />
        {!collapsed ? <h1>SOA Administrator</h1> : null}
      </div>
      <Menu
        items={menuItems}
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="sidebar__menu"
      />
    </Sider>
  )
}

export default Sidebar

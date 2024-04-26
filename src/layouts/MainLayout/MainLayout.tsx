import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const MainLayout = () => {
  return (
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}
export default MainLayout

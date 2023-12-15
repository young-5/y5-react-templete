import BreadCrumb from '@/components/BreadCrumb'
import Menu from '@/components/Menu'
import routes from '@/routes/index'
import { Layout } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import BasicHeader from './BasicHeader'
// import actions from '@/micros/actions'
import cs from './index.module.less'
const { Sider, Header, Content } = Layout

const BasicLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const userInfo: any = useSelector((state: any) => {
    // console.log(state)
    return {
      ...state.user.userInfo,
    }
  })
  // actions.onGlobalStateChange((state, preState) => {
  //   console.log('子应用监听到', state)
  // })
  useEffect(() => {}, [userInfo])
  const navigate = useNavigate()

  return (
    <Layout className={cs.basic_layout}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <BasicHeader />
      </Header>
      <Layout id='baseCustomScroll'>
        <Sider
          collapsible
          collapsed={collapsed}
          style={{
            minHeight: '600px',
            marginTop: '10px',
          }}
          onCollapse={() => {
            setCollapsed((cur) => !cur)
          }}>
          <Menu routers={routes} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>
            <BreadCrumb RouterMapAuth={routes} />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout

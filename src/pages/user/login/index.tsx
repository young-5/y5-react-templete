import * as React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import fetch from '@/apis/request'
import { changeUserInfo } from '@/store/module/user'
import { useDispatch, useSelector } from 'react-redux'
import actions from '@/micros/actions'
import cs from './index.module.less'
const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = (values: any) => {
    console.log('Success:', values)
    actions.setGlobalState({
      userInfo: {
        name: '小五',
      },
    })
    fetch
      .fetch({
        url: '/api/v1/users/login',
        method: 'post',
        params: {
          userId: values.password,
          name: values.username,
        },
      })
      .then((res) => {
        dispatch(
          changeUserInfo({
            name: 'y5-react',
            id: '4567345',
          }),
        )
        goConter()
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const goConter = () => {
    navigate('/home')
  }
  return (
    <div className={cs.login_box}>
      <div>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'>
          <Form.Item
            label='用户名'
            name='username'
            rules={[{ required: true, message: '随便输入!' }]}>
            <Input placeholder='随便输入' />
          </Form.Item>

          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '随便输入!' }]}>
            <Input.Password placeholder='随便输入' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit' style={{ width: '290px' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Home

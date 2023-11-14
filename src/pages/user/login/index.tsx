import fetch from '@/apis/request'
import actions from '@/micros/actions'
import { changeUserInfo } from '@/store/module/user'
import { Button, Checkbox, Form, Input } from 'antd'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
            name: '小五1',
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
            rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='remember'
            valuePropName='checked'
            wrapperCol={{ offset: 0, span: 16 }}>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 0 }}>
            <Button type='primary' htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Home

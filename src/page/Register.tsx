import React from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_URL } from '../constant/routerConstant'
import { useRequest } from 'ahooks'
import { registerApi } from '../services/user'
export default function Register() {
  const { Title } = Typography
  const nav = useNavigate()

  const { run } = useRequest(
    async values => {
      const { username, password, nickname } = values
      await registerApi(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        nav(LOGIN_URL) // 跳转到登录页
      },
    }
  )
  const onFinish = (values: any) => {
    run(values) // 调用 ajax
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入账号' },
              { type: 'string', min: 5, max: 20, message: '字符长度应在5到20之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线 ' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // 没有值时不提示两次密码不一致
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次密码不一致'))
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={LOGIN_URL}>已有账户登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

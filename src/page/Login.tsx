import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { Link } from 'react-router-dom'
import styles from './register.module.scss'
import { UserAddOutlined } from '@ant-design/icons'
import { MANAGE_LIST_URL, REGISTER_URL } from '../constant/routerConstant'
import { useRequest } from 'ahooks'
import { loginApi } from '../services/user'
import { setToken } from '../utils/user-token'

export default function Login() {
  const nav = useNavigate()
  const [form] = Form.useForm()
  useEffect(() => {
    const { username, password } = getUserFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const { Title } = Typography
  const USERNAME_KEY = 'USERNAME'
  const PASSWORD_KEY = 'PASSWORD'
  const rememberUser = (username: string, password: string) => {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
  }
  const deleteUserFromStorage = () => {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
  }
  const getUserFromStorage = () => {
    return {
      username: localStorage.getItem(USERNAME_KEY),
      password: localStorage.getItem(PASSWORD_KEY),
    }
  }
  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginApi(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        setToken(token) // 存储 token
        console.log(token,'token')

        message.success('登录成功')
        nav(MANAGE_LIST_URL) // 导航到“我的问卷”
      },
    }
  )

  const onFinish = (values: any) => {
    const { username, password, remember } = values
    console.log(values)

    run(username, password) // 执行 ajax
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
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
          <Form.Item wrapperCol={{ offset: 6, span: 16 }} name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_URL}>注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

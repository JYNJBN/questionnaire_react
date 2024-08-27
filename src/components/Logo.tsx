import { Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import { HOME_URL, MANAGE_LIST_URL } from '../constant/routerConstant'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
export default function Logo() {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState('/')
  useEffect(() => {
    setPathname(username === '' ? HOME_URL : MANAGE_LIST_URL)
  }, [username])
  const { Title } = Typography
  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined></FormOutlined>
          </Title>
          <Title>小叶问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

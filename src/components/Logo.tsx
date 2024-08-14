import { Space, Typography } from 'antd'
import React from 'react'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import { LOGIN_URL } from '../constant/routerConstant'
export default function Logo() {
  const { Title } = Typography
  return (
    <div className={styles.container}>
      <Link to={LOGIN_URL}>
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

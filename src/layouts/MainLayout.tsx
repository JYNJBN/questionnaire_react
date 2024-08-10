import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

export default function MainLayout() {
  const { Header, Content, Footer } = Layout
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {/* 类似slot */}
        <Outlet></Outlet>
      </Content>
      <Footer className={styles.footer}>小叶问卷 @2024 -Create By JYNJBN</Footer>
    </Layout>
  )
}

import { Button, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './home.module.scss'
import axios from 'axios'
import { MANAGE_LIST_URL } from '../constant/routerConstant'
export default function Home() {
  const nav = useNavigate()
  useEffect(() => {
    // axios.get('/api/test')
  }, [])
  const { Title, Paragraph } = Typography
  return (
    <div className={styles.container}>
      <div>
        <Title>问卷调查 | 构建你的问卷</Title>
        <Paragraph>
          小叶问卷调查，免费创建问卷调查，分享问卷调查，收集问卷调查。
          <br />
          已累计创建100份问卷调查，累计收集900份问卷调查。
        </Paragraph>
        <Button
          type="primary"
          onClick={() => {
            nav(MANAGE_LIST_URL)
          }}
        >
          开始使用
        </Button>
      </div>
    </div>
  )
}

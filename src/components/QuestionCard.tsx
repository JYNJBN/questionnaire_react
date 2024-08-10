import React, { FC, useEffect } from 'react'
import classnames from 'classnames'
// import './QuestionCard.css'
import styles from './QuestionCard.module.scss'
import { Button, Space } from 'antd'
import { EditOutlined, LineChartOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { QUESTION_EDIT_URL, QUESTION_STAT_URL } from '../utils/constant'
// ts 自定义类型
type PropsType = {
  _id: string | number
  title: string
  isPublished: boolean
  isStart: boolean
  answerCount: number
  createdAt: string
}

// FC - functional component
const QuestionCard: FC<PropsType> = props => {
  const { _id, title, createdAt, answerCount, isPublished } = props
  const nav = useNavigate()
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <a href="#">{title}</a>
          </div>
          <div className={styles.right}>
            {isPublished ? (
              <span style={{ color: 'green' }}>已发布</span>
            ) : (
              <span style={{ color: 'red' }}>未发布</span>
            )}
            <span>答卷：{answerCount}</span>
            &nbsp;
            <span>{createdAt}</span>
          </div>
        </div>
        <div className={styles['Button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => {
                  nav(`${QUESTION_EDIT_URL}${_id}`)
                }}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => {
                  nav(`${QUESTION_STAT_URL}${_id}`)
                }}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Button>标星</Button>
            <Button>复制</Button>
            <Button>删除</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard

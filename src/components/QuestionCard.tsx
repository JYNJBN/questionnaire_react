import React, { FC, useEffect } from 'react'
import classnames from 'classnames'
// import './QuestionCard.css'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { QUESTION_EDIT_URL, QUESTION_STAT_URL } from '../constant/routerConstant'
import { is } from 'immer/dist/internal'
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
  const { _id, title, createdAt, answerCount, isPublished, isStart } = props
  const nav = useNavigate()
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `${QUESTION_EDIT_URL}${_id}` : `${QUESTION_STAT_URL}${_id}`}>
              <Space>
                {isStart && <StarOutlined style={{ color: 'red ' }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="blue">已发布</Tag> : <Tag color="red">未发布</Tag>}
              <span>答卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider />
        <div className={styles['button-container']}>
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
                disabled={isPublished ? false : true}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button icon={<StarOutlined />} type="text" size="small">
                {isStart ? '取消标星' : '标星'}
              </Button>
              <Button icon={<CopyOutlined />} type="text" size="small">
                复制
              </Button>
              <Button icon={<DeleteOutlined />} type="text" size="small">
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard

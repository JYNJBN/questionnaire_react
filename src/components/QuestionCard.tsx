import React, { FC, useEffect, useState } from 'react'
import classnames from 'classnames'
// import './QuestionCard.css'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { QUESTION_EDIT_URL, QUESTION_STAT_URL } from '../constant/routerConstant'
import { useRequest } from 'ahooks'
import { duplicateQuestionApi, updateQuestionApi } from '../services/question'
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
  // 这里使用isStartState来控制是否标星 是因为后端使用的是mock数据，更新后再请求列表的话数据会变
  const [isStarState, setIsStarState] = useState(isStart)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionApi(_id as string, { isStart: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
      },
    }
  )
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionApi(_id as string),
    {
      manual: true,
      onSuccess(result: any) {
        nav(`/question/edit/${result.id}`)
      },
    }
  )
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionApi(_id as string, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )
  const nav = useNavigate()

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `${QUESTION_EDIT_URL}${_id}` : `${QUESTION_STAT_URL}${_id}`}>
              <Space>
                {isStarState && <StarOutlined style={{ color: 'red ' }} />}
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
          <div className={styles.right} onClick={changeStar}>
            <Space>
              <Button icon={<StarOutlined />} type="text" size="small" loading={changeStarLoading}>
                {isStarState ? '取消标星' : '标星'}
              </Button>
              <Button
                icon={<CopyOutlined />}
                type="text"
                size="small"
                onClick={duplicate}
                loading={duplicateLoading}
              >
                复制
              </Button>
              <Button
                icon={<DeleteOutlined />}
                type="text"
                size="small"
                onClick={deleteQuestion}
                loading={deleteLoading}
              >
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

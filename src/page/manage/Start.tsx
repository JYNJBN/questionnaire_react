import React, { useState } from 'react'
import listStyle from './comment.module.scss'
import { Typography, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'

const questionListArr = [
  {
    _id: 1,
    title: '123',
    isPublished: true,
    isStart: true,
    answerCount: 1,
    createdAt: '2022-01-01',
  },
  {
    _id: 2,
    title: '123',
    isPublished: false,
    isStart: true,
    answerCount: 1,
    createdAt: '2022-01-01',
  },
  {
    _id: 3,
    title: '123',
    isPublished: true,
    isStart: false,
    answerCount: 1,
    createdAt: '2022-01-01',
  },
]
export default function Start() {
  const [questionList, setQuestionList] = useState(questionListArr)
  const { Title } = Typography

  return (
    <>
      <div className={listStyle.header}>
        <Title level={3} className={listStyle.left}>
          星标问卷
        </Title>
        <input type="text" className={listStyle.right} />
      </div>
      <div className={listStyle.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(q => {
            return <QuestionCard key={q._id} {...q}></QuestionCard>
          })}
      </div>
      <div className={listStyle.footer}>分页</div>
    </>
  )
}

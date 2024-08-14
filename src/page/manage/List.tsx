import { useSafeState } from 'ahooks'
import React, { useState } from 'react'
import listStyle from './comment.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
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
export default function List() {
  const [questionList, setQuestionList] = useState(questionListArr)
  const { Title } = Typography
  return (
    <div>
      <div className={listStyle.header}>
        <Title level={3} className={listStyle.left}>
          我的问卷
        </Title>

        <div className={listStyle.right}>
          <ListSearch />
        </div>
      </div>
      <div className={listStyle.content}>
        {questionList.length > 0 &&
          questionList.map(q => {
            return <QuestionCard key={q._id} {...q}></QuestionCard>
          })}
      </div>
      <div className={listStyle.footer}>加载更多....</div>
    </div>
  )
}

import { useSafeState } from 'ahooks'
import React from 'react'
import listStyle from './comment.module.scss'
import QuestionCard from '../components/QuestionCard'
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
    isPublished: true,
    isStart: true,
    answerCount: 1,
    createdAt: '2022-01-01',
  },
  {
    _id: 3,
    title: '123',
    isPublished: true,
    isStart: true,
    answerCount: 1,
    createdAt: '2022-01-01',
  },
]
export default function List() {
  const [questionList, setQuestionList] = useSafeState(questionListArr)
  return (
    <div>
      <div className={listStyle.header}>
        <div className={listStyle.left}>我的问卷</div>
        <input type="text" className={listStyle.right} />
      </div>
      <div className={listStyle.content}>
        {questionList.length > 0 &&
          questionList.map(q => {
            return <QuestionCard key={q._id} {...q}></QuestionCard>
          })}
      </div>
      <div className={listStyle.footer}>footer</div>
    </div>
  )
}

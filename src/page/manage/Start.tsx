import React, { useState } from 'react'
import listStyle from './comment.module.scss'
import { Typography, Empty, Spin } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { useLoadingQuestionList } from '../../hooks/useLoadQuetionList'
import ListPage from '../../components/ListPage'

export default function Start() {
  const { Title } = Typography
  const { data = {}, loading } = useLoadingQuestionList({ isStart: true })
  const { list = [], total = 0 } = data
  return (
    <>
      <div className={listStyle.header}>
        <Title level={3} className={listStyle.left}>
          星标问卷
        </Title>
        <div className={listStyle.right}>
          <ListSearch />
        </div>
      </div>
      <div className={listStyle.content}>
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        <div style={{ textAlign: 'center' }}>{loading && <Spin size="large" />}</div>
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            return <QuestionCard key={q._id} {...q}></QuestionCard>
          })}
      </div>
      <div className={listStyle.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

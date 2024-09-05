import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoadingQuestionData from '../../../hooks/useLoadingQuestionData'
import { Button, Result, Spin } from 'antd'
import styles from './index.module.scss'
import { useTitle } from 'ahooks'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { StatHeader } from './StatHeader'
import ComponentList from './ComponentList'
import { PageStat } from './PageStat'
import { ChartStat } from './ChartStat'
export default function Edit() {
  // 状态提升 selectedId type 这里的选中 只用于他的子组件不需要全局使用故不使用redux
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')
  const nav = useNavigate()
  const { loading } = useLoadingQuestionData()
  const { isPublished, title } = useGetPageInfo()
  useTitle('问卷统计' + title)
  // loading 效果
  const LoadingELem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )
  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      )
    }
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }
  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading && LoadingELem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  )
}

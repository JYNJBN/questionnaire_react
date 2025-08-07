import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import listStyle from './comment.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { LIST_PAGESIZE_LIMIT, LIST_SEARCH_PARAM_KEY } from '../../constant/searchConstant'
import { getQuestionListApi } from '../../services/question'

export default function List() {
  useTitle('小叶问卷-我的问卷')
  const [page, setPage] = useState(1) // List 内部的数据，不在 url 参数中体现
  const [list, setList] = useState([]) // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length // 有没有更多的、为加载完成的数据
  const [searchParams] = useSearchParams() // url 参数，虽然没有 page pageSize ，但有 keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListApi({
        page,
        pageSize: LIST_PAGESIZE_LIMIT,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result: any) {
        const { list: l = [], total = 0 } = result
        console.log('l', l);
        setList(list.concat(l)) // 累计
        setTotal(total)
        setPage(page + 1)
      },
    }
  )
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load() // 真正加载数据
        // setStarted(true)
      }
      console.log('load more')
    },
    { wait: 500 }
  )
  // 第一次进入页面
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // 当页面滚动，尝试加载
  useEffect(() => {
    if (haveMoreData) {
      {
        window.addEventListener('scroll', tryLoadMore)
      }
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // keyword 变化时，重置信息
  useEffect(() => {
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])
  const { Title } = Typography
  const LoadMoreContentElem = useMemo(() => {
    if (loading) return <Spin />
    if (loading && total === 0) return <Empty description="暂无数据" />
    if (loading && !haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [loading, haveMoreData])
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
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={listStyle.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </div>
  )
}

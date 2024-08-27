import React, { useState } from 'react'
import listStyle from './comment.module.scss'
import { Typography, Empty, Table, Tag, Space, Button, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import { useLoadingQuestionList } from '../../hooks/useLoadQuetionList'
import { deleteQuestionsApi, updateQuestionApi } from '../../services/question'
import { useRequest } from 'ahooks'

export default function Trash() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { Title } = Typography
  const { data = {}, loading, refresh } = useLoadingQuestionList({ isDeleted: true })
  const { list = [], total = 0 } = data

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionApi(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功')
        refresh() // 手动刷新列表
        setSelectedIds([])
      },
    }
  )

  // 删除
  const { run: deleteQuestion } = useRequest(async () => await deleteQuestionsApi(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      refresh()
      setSelectedIds([])
    },
  })
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="blue">已发布</Tag> : <Tag color="red">未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ]
  function del() {
    Modal.confirm({
      title: '确认彻底删除问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后无法找回！',
      onOk: () => {
        deleteQuestion()
      },
    })
  }
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: rowKey => {
            setSelectedIds(rowKey as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={listStyle.header}>
        <Title level={3} className={listStyle.left}>
          回收站
        </Title>
        <ListSearch />
      </div>
      <div className={listStyle.content}>
        <div style={{ textAlign: 'center' }}>{loading && <Spin size="large" />}</div>
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading && list.length > 0 && TableElem}
      </div>
      <div className={listStyle.footer}>分页</div>
    </>
  )
}

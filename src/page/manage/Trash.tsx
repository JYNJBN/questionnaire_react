import React, { useState } from 'react'
import listStyle from './comment.module.scss'
import { Typography, Empty, Table, Tag, Space, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
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

export default function Trash() {
  const [questionList, setQuestionList] = useState(questionListArr)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { Title } = Typography
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
        alert(`删除${JSON.stringify(selectedIds)}`)
      },
    })
  }
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button disabled={selectedIds.length === 0}>恢复</Button>
          <Button disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
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
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={listStyle.footer}>分页</div>
    </>
  )
}

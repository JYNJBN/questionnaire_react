import { Button, Input, message, Space, Typography } from 'antd'
import React, { ChangeEvent, FC, useState } from 'react'
import styles from './EditHeader.module.scss'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { EditToolbar } from './EditToolbar'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { EditOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionApi } from '../../../services/question'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { KeyEvent } from 'ahooks/lib/useKeyPress'
import { wait } from '@testing-library/user-event/dist/utils'
const { Title } = Typography
// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePageTitle(e.target.value.trim()))
  }
  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => {
          setEditState(false)
        }}
      />
    )
  }
  return (
    <Space align="baseline">
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined />}
        onClick={() => {
          setEditState(true)
        }}
      ></Button>
    </Space>
  )
}
// 保存
const SaveButton: FC = () => {
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: save } = useRequest(
    async () => {
      await updateQuestionApi(id as string, { ...pageInfo, componentList })
    },
    { manual: true }
  )
  // 快捷键
  useKeyPress(['ctrl.s', 'mete.s'], (e: KeyboardEvent) => {
    e.preventDefault()
    if (!loading) save()
  })
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )
  return (
    <Button type="primary" loading={loading} onClick={save}>
      保存
    </Button>
  )
}
// 发布
const PublishButton: FC = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: pub } = useRequest(
    async () => {
      await updateQuestionApi(id as string, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )
  return (
    <Button loading={loading} onClick={pub}>
      发布
    </Button>
  )
}
export const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

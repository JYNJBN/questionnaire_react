import React from 'react'
import { Space, Button, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import getComponentInfo from '../../../hooks/useGetComponentInfo'

export const EditToolbar = () => {
  const dispatch = useDispatch()
  const { currentSelectedId, selectedComponent, copyComponent } = getComponentInfo()
  console.log('🚀 ~ EditToolbar ~ selectedComponent:', copyComponent)

  const { isLocked } = selectedComponent || {}
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: currentSelectedId, isHidden: true }))
  }
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: currentSelectedId }))
  }
  function handleCopy() {
    dispatch(copySelectedComponent())
  }
  function handlePaste() {
    dispatch(pasteCopiedComponent())
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          disabled={copyComponent == null}
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
        ></Button>
      </Tooltip>
    </Space>
  )
}

import React, { useRef } from 'react'
import styles from './StatHeader.module.scss'
import { Button, Input, InputRef, message, Popover, Space, Tooltip, Typography } from 'antd'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { QRCodeSVG } from 'qrcode.react'

export const StatHeader = () => {
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { Title } = Typography
  const { id } = useParams()
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (!elem) return null
    elem.select()
    document.execCommand('copy')
    message.success('复制成功')
  }

  const linkAndCodeElem = () => {
    console.log(!isPublished)

    if (typeof isPublished === 'boolean' && !isPublished) return null
    // 拼接 url ，需要参考 C 端的规则
    const url = `http://localhost:3100/question/${id}`
    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCodeSVG value={url} size={150} />
      </div>
    )
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{linkAndCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

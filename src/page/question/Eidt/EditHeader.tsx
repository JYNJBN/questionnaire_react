import { Button, Space } from 'antd'
import React, { FC } from 'react'
import styles from './EditHeader.module.scss'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { EditToolbar } from './EditToolbar'
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
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="primary">保存</Button>
            <Button>发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

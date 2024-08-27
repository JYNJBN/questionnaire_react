import React, { Children, FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { icons } from 'antd/es/image/PreviewGroup'
import { ComponentLib } from './ComponentLib'
import { Layers } from './Layers'

export const LeftPanel: FC = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: '组件库',
      icon: <AppstoreOutlined />,
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: '图层',
      icon: <BarsOutlined />,
      children: <Layers />,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabItems}></Tabs>
}

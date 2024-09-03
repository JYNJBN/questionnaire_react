import React, { FC, useEffect } from 'react'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import { resetPageInfo } from '../../../store/pageInfoReducer'
import { useDispatch } from 'react-redux'

export const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const { TextArea } = Input
  const dispatch = useDispatch()
  const handleValueChange = () => {
    const newPageInfo = form.getFieldsValue()
    dispatch(resetPageInfo(newPageInfo))
  }
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])
  return (
    <Form layout="vertical" form={form} initialValues={pageInfo} onValuesChange={handleValueChange}>
      <Form.Item
        label="页面标题"
        name="title"
        rules={[{ required: true, message: '请输入页面标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

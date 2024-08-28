import { Form, Input, message } from 'antd'
import React, { FC, useEffect } from 'react'
import { QuestionInputPropsType } from './Interface'

export const PropComponent: FC<QuestionInputPropsType> = props => {
  const { title, placeholder, onChange, disable } = props
  const [form] = Form.useForm()
  // 监听表单变化，同步到props
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      disabled={disable}
      layout="vertical"
      form={form}
      initialValues={{ title, placeholder }}
      onValuesChange={handleValueChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

import React, { FC, useEffect } from 'react'
import { QuestionTitlePropsType } from './Interface'
import { Checkbox, Form, Input, Select } from 'antd'

export const PropComponent: FC<QuestionTitlePropsType> = props => {
  const { text, isCenter, level, onChange } = props
  const [form] = Form.useForm()
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    })
  }, [text, level, isCenter])

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ text, isCenter, level }}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

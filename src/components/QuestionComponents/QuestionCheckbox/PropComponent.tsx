import React, { FC, useEffect } from 'react'
import { QuestionCheckboxPropsType } from './Interface'
import { Form, Checkbox, Select, Input, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { OptionType } from './Interface'
export const PropComponent: FC<QuestionCheckboxPropsType> = props => {
  const { title, list = [], isVertical, onChange, disable } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, list, isVertical })
  }, [title, isVertical, list])
  function handleValuesChange() {
    if (onChange) {
      const newValue: QuestionCheckboxPropsType = form.getFieldsValue()
      newValue.list?.forEach(opt => {
        // 默认值不能为空 将label值为value 因为label做了唯一校验
        if (opt.value === '') opt.value = opt.label
      })
      console.log('🚀 ~ handleValuesChange ~ newValue:', newValue)
      onChange(newValue)
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, list, isVertical }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disable}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                console.log(name)
                return (
                  <Space key={name} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator(_, value) {
                            let num = 0
                            const list = form.getFieldValue('list') || []
                            list.forEach((opt: OptionType) => {
                              if (opt.label === value) num++
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                {/* 添加选项 */}
                <Button
                  type="dashed"
                  onClick={() => add({ value: '', label: '' })}
                  block
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

import React, { FC } from 'react'
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './Interface'
import { Checkbox, Space, Typography } from 'antd'

const { Paragraph } = Typography
export const QuestionCheckbox: FC<QuestionCheckboxPropsType> = props => {
  console.log(1)

  const { title, list = [], isVertical } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <Paragraph>
      {title}
      <div>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {list.map(opt => {
            const { value, label, checked } = opt
            return (
              <Checkbox key={value} value={value} checked={checked}>
                {label}
              </Checkbox>
            )
          })}
        </Space>
      </div>
    </Paragraph>
  )
}

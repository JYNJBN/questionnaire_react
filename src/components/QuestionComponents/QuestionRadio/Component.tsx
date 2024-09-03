import React, { FC } from 'react'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './Interface'
import { Radio, Space, Typography } from 'antd'

const { Paragraph } = Typography
export const QuestionRadio: FC<QuestionRadioPropsType> = props => {
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props }
  return (
    <Paragraph>
      {title}
      <div>
        <Radio.Group value={value}>
          <Space direction={isVertical ? 'vertical' : 'horizontal'}>
            {options.map(opt => {
              const { value, label } = opt
              return (
                <Radio key={value} value={value}>
                  {label}
                </Radio>
              )
            })}
          </Space>
        </Radio.Group>
      </div>
    </Paragraph>
  )
}

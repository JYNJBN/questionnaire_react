import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from './Interface'

const { Title, Paragraph } = Typography

export const QuestionInfo: FC<QuestionInfoPropsType> = props => {
  const { title, desc = '' } = { ...QuestionInfoDefaultProps, ...props }
  const descTextList = desc.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descTextList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

import React, { FC } from 'react'
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './Interface'
import { Typography } from 'antd'

const { Title } = Typography
export const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter } = { ...QuestionTitleDefaultProps, ...props }
  const genFontSize = (level: 1 | 2 | 3 | 4 | 5 | undefined) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }
  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'left',
          marginBottom: 0,
          fontSize: genFontSize(level),
        }}
      >
        {text}
      </Title>
    </div>
  )
}

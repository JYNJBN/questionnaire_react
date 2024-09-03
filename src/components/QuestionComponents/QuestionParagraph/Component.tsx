import React, { FC } from 'react'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './Interface'

import { Typography } from 'antd'
const { Paragraph } = Typography

export const QuestionParagraph: FC<QuestionParagraphPropsType> = props => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
  const textList = text.split('\n') // 例如 ['hello', '123', '456']

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start' }}>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

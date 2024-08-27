import React, { FC } from 'react'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './Interface'
import { Typography, Input } from 'antd'
const { Paragraph } = Typography
export const QuestionInput: FC<QuestionInputPropsType> = props => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }
  console.log(props)

  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

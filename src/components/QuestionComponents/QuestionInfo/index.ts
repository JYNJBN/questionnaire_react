import { QuestionInfo } from './Component'
import { PropComponent } from './PropComponent'
import { QuestionInfoDefaultProps } from './Interface'
export * from './Interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component: QuestionInfo,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}

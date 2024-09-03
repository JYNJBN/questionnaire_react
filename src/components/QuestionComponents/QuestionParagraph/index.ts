import { QuestionParagraphDefaultProps } from './Interface'
import { PropComponent } from './PropComponent'
import { QuestionParagraph } from './Component'

export * from './Interface'
export default {
  title: '段落',
  type: 'questionParagraph',
  Component: QuestionParagraph,
  defaultProps: QuestionParagraphDefaultProps,
  PropComponent: PropComponent,
}

import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'

function isActiveElementValid() {
  const activeElement = document.activeElement
  console.log('🚀 ~ isActiveElementValid ~ activeElement:', activeElement)
  console.log('🚀 ~ isActiveElementValid ~ activeElement:', activeElement?.className)

  if (activeElement === document.body) return true
  if (activeElement?.matches('div[role="button"]')) return true

  return false
}
const useBindCanvasKeyPress = () => {
  const disPatch = useDispatch()
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElementValid()) {
      disPatch(removeSelectedComponent())
    }
  })
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid()) {
      disPatch(copySelectedComponent())
    }
  })
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid()) {
      disPatch(pasteCopiedComponent())
    }
  })
  // 选中上一个
  useKeyPress(['uparrow'], () => {
    if (isActiveElementValid()) {
      disPatch(selectPrevComponent())
    }
  })
  // 选中下一个
  useKeyPress('downarrow', () => {
    if (isActiveElementValid()) {
      disPatch(selectNextComponent())
    }
  })
}

export default useBindCanvasKeyPress

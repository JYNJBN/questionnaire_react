import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

function isActiveElementValid() {
  const activeElement = document.activeElement
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
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      disPatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true, // 严格匹配
    }
  )

  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    disPatch(UndoActionCreators.redo())
  })
}

export default useBindCanvasKeyPress

import React from 'react'
import useLoadingQuestionData from '../../../hooks/useLoadingQuestionData'
import styles from './index.module.scss'
import { EditCanvas } from './EditCanvas'
import { useDispatch } from 'react-redux'
import { setCurrentSelectedId } from '../../../store/componentsReducer'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'
import { EditHeader } from './EditHeader'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import { useTitle } from 'ahooks'

export default function Edit() {
  const { loading } = useLoadingQuestionData()
  const dispatch = useDispatch()
  // 修改标题
  const { title } = useGetPageInfo()
  useTitle(`问卷编辑 - ${title}`)
  function clearSelectId() {
    dispatch(setCurrentSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: 'black' }}>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div
            className={styles.main}
            onClick={() => {
              clearSelectId()
            }}
          >
            <div className={styles['canvas-wrapper']}>
              <div>
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

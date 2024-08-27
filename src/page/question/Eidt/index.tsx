import React from 'react'
import useLoadingQuestionData from '../../../hooks/useLoadingQuestionData'
import styles from './index.module.scss'
import { EditCanvas } from './EditCanvas'
import { useDispatch } from 'react-redux'
import { setCurrentSelectedId } from '../../../store/componentsReducer'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'

export default function Edit() {
  const { loading } = useLoadingQuestionData()
  const dispatch = useDispatch()

  function clearSelectId() {
    dispatch(setCurrentSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: 'black' }}>Header</div>
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
              <div style={{ height: '800px' }}>
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

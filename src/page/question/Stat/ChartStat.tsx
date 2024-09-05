import { useRequest } from 'ahooks'
import React, { FC, useEffect, useState } from 'react'
import { getComponentStartListApi } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  selectedComponentType: string
}
import { getComponentConfByType } from '../../../components/QuestionComponents/index'
const { Title } = Typography
export const ChartStat: FC<PropsType> = props => {
  const { selectedComponentId, setSelectedComponentId, selectedComponentType } = props
  const { id } = useParams()
  const [stat, setStat] = useState([])
  const { run, loading } = useRequest(
    async (questionId: string, componentId: string) =>
      await getComponentStartListApi(id as string, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )
  const genStatElem = () => {
    if (!selectedComponentId) return <div>请先选择组件</div>
    const componentConf = getComponentConfByType(selectedComponentType)
    if (componentConf) {
      const { StatComponent } = componentConf
      if (StatComponent === null || StatComponent === undefined) return <div>该组件无统计图表</div>
      return <div>{<StatComponent stat={stat} />}</div>
    }
  }
  useEffect(() => {
    if (selectedComponentId) run(id as string, selectedComponentId)
  }, [id, selectedComponentId])
  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

import React, { FC, PureComponent, useMemo } from 'react'
import { QuestionRadioStatPropType } from './Interface'
import { Tooltip, PieChart, ResponsiveContainer, Pie, Cell } from 'recharts'
import { STAT_COLORS } from '../../../constant/searchConstant'
function format(n: number) {
  return (n * 100).toFixed(2)
}

export const StatComponent: FC<QuestionRadioStatPropType> = props => {
  const { stat } = props
  console.log(stat, 'stat')

  const sum = useMemo(() => {
    return stat.reduce((cur, pre) => {
      return cur + pre.count
    }, 0)
  }, [stat])
  return (
    <div style={{ width: '300px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%" // x 轴的偏移
            cy="50%" // y 轴的偏移
            outerRadius={50} // 饼图的直径
            fill="#8884d8"
            label={i => `${i.name}: ${format(i.count / sum)}%`}
          >
            {stat.map((i, index) => {
              return <Cell key={index} fill={STAT_COLORS[index]} />
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

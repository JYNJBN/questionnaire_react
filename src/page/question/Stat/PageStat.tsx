import { useRequest } from 'ahooks'
import React, { FC, useState } from 'react'
import { getStartListApi } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { LIST_PAGESIZE_LIMIT } from '../../../constant/searchConstant'
import { Typography, Spin, Table, Pagination } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
const { Title } = Typography
export const PageStat: FC<PropsType> = props => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList, currentSelectedId } = useGetComponentInfo()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGESIZE_LIMIT)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const { id = '' } = useParams()
  const { loading } = useRequest(
    async () => {
      const res = await getStartListApi(id, {
        page,
        pageSize,
      })
      return res
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res
        setTotal(total)
        setList(list)
      },
    }
  )
  const tableColumns = componentList.map(c => {
    const { fe_id, title, props, type = '' } = c
    const ctitle = props!.title || title
    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id == selectedComponentId ? '#1890ff' : 'inherit' }}>
            {ctitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })
  const TableElem = (
    <>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q: any) => q._id}
      />
      <div
        style={{
          textAlign: 'center',
          marginTop: '18px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )
  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  )
}

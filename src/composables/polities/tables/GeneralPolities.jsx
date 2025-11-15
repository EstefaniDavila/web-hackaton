import React, { useMemo } from 'react'
import DataTable from '@/components/custom/data_table'
import columns from '@/services/polities/columns'
import useEntityMutation from '@/hooks/useEntityMutation'

const TablePolities = ({
  handleOpenModal,
  data,
  fetchData,
  pagination,
  setPagination,
  setPolitical_parties,
  setTypeModal,
  totalPages,
  search,
  setSearch,
  searchFields,
  setSearchFields
}) => {

  const { mutateAsync } = useEntityMutation({ entityName: 'political_parties' })

  const handleDelete = async (id) => {
    try {
      await mutateAsync({
        action: 'delete',
        endpoint: `api/v1/admin/political_parties/${id}`
      })
      fetchData()  
    } catch (error) {
      console.error('Error deleting political_parties', error)
    }
  }

  const handleUpdate = (political_party) => {
    setPolitical_parties(political_party)
    setTypeModal('edit')
    handleOpenModal('edit', political_party)
  }

  const handleShow = (political_party) => {
    setPolitical_parties(political_party)
    setTypeModal('show')
    handleOpenModal('show', political_party)
  }

  const columnsWithActions = useMemo(
    () => columns(handleDelete, handleUpdate, handleShow),
    [handleDelete, handleUpdate, handleShow]
  )

  return (
    <DataTable
      columns={columnsWithActions}
      data={data}
      fetchData={fetchData}
      pagination={pagination}
      setPagination={setPagination}
      totalPages={totalPages}
      search={search}
      setSearch={setSearch}
      searchFields={searchFields}
      setSearchFields={setSearchFields}
      searchableFields={["name", "acronym"]}
    />
  )
}

export default TablePolities

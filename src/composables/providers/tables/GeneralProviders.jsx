import React, { useMemo } from 'react'
import DataTable from '@/components/custom/data_table'
import columns from '@/services/providers/columns'
import useEntityMutation from '@/hooks/useEntityMutation'

const TableProviders = ({ handleOpenModal, data, fetchData, pagination, setPagination, setProvider, setTypeModal, totalPages, search, setSearch, searchFields, setSearchFields }) => {
  const {mutateAsync} = useEntityMutation({entityName : 'provider'})

  const handleDelete = async (id) => {
  try {
    await mutateAsync({
      action: 'delete',
      endpoint: `api/v1/admin/providers/${id}`
    })
  } catch (error) {
    console.error("Error deleting provider:", error)
  }
}

  const handleUpdate = (provider) => {
    setProvider(provider)
    setTypeModal('edit')
    handleOpenModal('edit', provider)
  }

  const handleDescription = (provider) => {
    setProvider(provider)
    setTypeModal('showDescription')
    handleOpenModal('showDescription', provider)
  }

  const columnsWithActions = useMemo(() => columns(handleDelete, handleUpdate, handleDescription), [handleDelete, handleUpdate, handleDescription])
  
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
      searchableFields={["name", "phone", "email"]}
    />
  )
}

export default TableProviders

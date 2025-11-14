import React, { useMemo } from 'react'
import DataTable from '@/components/custom/data_table'
import columns from '@/services/products/columns'
import useEntityMutation from '@/hooks/useEntityMutation'

const TableProducts = ({ handleOpenModal, data, fetchData, pagination, setPagination, setProduct, setTypeModal, totalPages, search, setSearch, searchFields, setSearchFields }) => {
  const {mutateAsync} = useEntityMutation({entityName: 'product'})

  const handleDelete = async (id) => {
    try {
      await mutateAsync({
        action: 'delete',
        endpoint: `api/v1/admin/products/${id}`
      })
    } catch (error) {
      console.error('Error deleting product', error)
    }
  }

  const handleUpdate = (product) => {
    setProduct(product)
    setTypeModal('edit')
    handleOpenModal('edit', product)
  }

  const handleShow = (product) => {
    setProduct(product)
    setTypeModal('show')
    handleOpenModal('show', product)
  }

  const columnsWithActions = useMemo(() => columns(handleDelete, handleUpdate, handleShow), [handleDelete, handleUpdate, handleShow])

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
      searchableFields={["name", "category_name", "provider_name", "status_web", "status"]}
    />
  )

}

export default TableProducts
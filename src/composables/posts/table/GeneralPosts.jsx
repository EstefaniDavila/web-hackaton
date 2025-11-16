import React, { useMemo } from 'react'
import DataTable from '@/components/custom/data_table'
import columns from '@/services/posts/columns'
import useEntityMutation from '@/hooks/useEntityMutation'

const TablePosts = ({ handleOpenModal, data, fetchData, pagination, setPagination, setPost, setTypeModal, totalPages, search, setSearch, searchFields, setSearchFields }) => {
  const {mutateAsync} = useEntityMutation({entityName: 'post'})

  const handleDelete = async (id) => {
    try {
      await mutateAsync({
        action: 'delete',
        endpoint: `api/v1/admin/posts/${id}`
      })
    } catch (error) {
      console.error('Error deleting post', error)
    }
  }

  const handleUpdate = (post) => {
    setPost(post)
    setTypeModal('edit')
    handleOpenModal('edit', post)
  }

  const handleShow = (post) => {
    setPost(post)
    setTypeModal('show')
    handleOpenModal('show', post)
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
      searchableFields={["title"]}
    />
  )

}

export default TablePosts
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TbPlus } from 'react-icons/tb' 

import useFetchPosts from '@/composables/posts/hooks/useFetchPosts'
import TablePosts from '@/composables/posts/table/GeneralPosts'
import ModalEditPost from '@/composables/posts/modals/modalEdit'
import ModalNewPost from '@/composables/posts/modals/modalNewPost'
// import SheetNewPolities from '@/composables/polities/modals/SheetNewPolities'
// import SheetShowPolities from '@/composables/polities/modals/SheetShowPolities'
// import SheetUpdatePolities from '@/composables/polities/modals/SheetUpdatePolities'

const Post = () => {
  const [typeModal, setTypeModal] = useState("")
  const [post, setPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const [search, setSearch] = useState("")
  const [searchFields, setSearchFields] = useState([
    "tittle,content"
  ])

  const searchParams = { search, fields: searchFields.join(',') }

  const {
    data: PostsData,
    refetch: refetchPosts
  } = useFetchPosts(pagination, searchParams)

  const totalPages = Math.ceil(
    (PostsData?.rowCount || 0) / pagination.pageSize
  )

  const handleOpenModal = (type, data = null) => {
    setIsModalOpen(true)
    setTypeModal(type)
    setPost(data)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTypeModal("")
    setPost(null)
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Puiblicaciones</CardTitle>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            onClick={() => handleOpenModal("new")}
            className="bg-amberCustom text-black hover:bg-amber-600"
          >
            <TbPlus />
          </Button>
        </CardContent>

        <TablePosts
          handleOpenModal={handleOpenModal}
          fetchData={refetchPosts}
          data={PostsData?.posts || []}
          pagination={pagination}
          setPost={setPost}
          setTypeModal={setTypeModal}
          setPagination={setPagination}
          totalPages={totalPages}
          search={search}
          setSearch={setSearch}
          searchFields={searchFields}
          setSearchFields={setSearchFields}
        />
      </Card>

      {typeModal === "new" && (
        <ModalNewPost
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          typeModal={typeModal}
          fetchData={refetchPosts}
        />
      )}

      {typeModal === "edit" && (
        <ModalEditPost
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          fetchData={refetchPosts}    
          post={post}
        />
      )}
    </div>
  )
}

export default Post
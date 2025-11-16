import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TbPlus } from 'react-icons/tb' 

import useFetchPosts from '@/composables/posts/hooks/useFetchPosts'
// import TablePolities from '@/composables/polities/tables/GeneralPolities'

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
    "title,content"
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
    setPolity(data)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTypeModal("")
    setPolity(null)
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

        {/* <TablePolities
          handleOpenModal={handleOpenModal}
          fetchData={refetchPolitical_parties}
          data={Political_partiesData?.rows || []}
          pagination={pagination}
          setPolitical_parties={setPolity}
          setTypeModal={setTypeModal}
          setPagination={setPagination}
          totalPages={totalPages}
          search={search}
          setSearch={setSearch}
          searchFields={searchFields}
          setSearchFields={setSearchFields}
        /> */}
      </Card>

      {/* {typeModal === "new" && (
        <SheetNewPolities
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          typeModal={typeModal}
          reload={refetchPolitical_parties}
        />
      )}

      {typeModal === "edit" && (
        <SheetUpdatePolities
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          typeModal={typeModal}
          polity={polity}
          reload={refetchPolitical_parties}
        />
      )} */}
    </div>
  )
}

export default Post
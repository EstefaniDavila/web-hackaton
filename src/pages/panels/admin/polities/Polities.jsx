import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TbPlus } from 'react-icons/tb' 

import useFetchPolities from '@/composables/polities/hooks/useFetchPolities'
import TablePolities from '@/composables/polities/tables/GeneralPolities'

import SheetNewPolities from '@/composables/polities/modals/SheetNewPolities'
import SheetShowPolities from '@/composables/polities/modals/SheetShowPolities'
import SheetUpdatePolities from '@/composables/polities/modals/SheetUpdatePolities'

const Polities = () => {
  const [typeModal, setTypeModal] = useState("")
  const [polity, setPolity] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const [search, setSearch] = useState("")
  const [searchFields, setSearchFields] = useState([
    "name,acronym"
  ])

  const searchParams = { search, fields: searchFields.join(',') }

  const {
    data: Political_partiesData,
    refetch: refetchPolitical_parties
  } = useFetchPolities(pagination, searchParams)

  const totalPages = Math.ceil(
    (Political_partiesData?.rowCount || 0) / pagination.pageSize
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
          <CardTitle>Partidos Políticos</CardTitle>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            onClick={() => handleOpenModal("new")}
            className="bg-green-200 text-black hover:bg-green-500"
          >
            <TbPlus />
          </Button>
        </CardContent>

        <TablePolities
          handleOpenModal={handleOpenModal}
          fetchData={refetchPolitical_parties}
          data={Political_partiesData?.rows || []}
          pagination={pagination}
          setPagination={setPagination}
          totalPages={totalPages}
          search={search}
          setSearch={setSearch}
          searchFields={searchFields}
          setSearchFields={setSearchFields}
        />
      </Card>

      {typeModal === "new" && (
        <SheetNewPolities
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          typeModal={typeModal}
          reload={refetchPolitical_parties}
        />
      )}

      {typeModal === "show" && (
        <SheetShowPolities
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          typeModal={typeModal}
          polity={polity}
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
      )}
    </div>
  )
}

export default Polities

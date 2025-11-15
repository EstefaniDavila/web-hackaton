import React, { useState } from "react"
import EntityFormMultiStep from "@/services/general/EntityFormMultiStep"
import ProductFormMultiStep from "@/services/polities/ProductFormWithFiles"
import { usePolitiesSteps } from '@/composables/polities/hooks/usePolitiesSteps'
import useEntityMutation from "@/hooks/useEntityMutation"
import useCrud from "@/hooks/useCrud"

const SheetNewPolities = ({ isOpen, handleClose, typeModal, reload, options }) => {
  const { steps, initialDataPolitical_parties, loading } = usePolitiesSteps()
  const mutation = useEntityMutation({entityName: 'political_parties'})

  const handleSubmit = async (formData) => {
    mutation.mutate(
      { action: 'create', entity: formData, endpoint: '/api/v1/admin/political_parties'},
      handleClose(),
    )
  }//new 

  const handleChange = (name, value) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value }
      return updatedData
    })
  }

  return (
    <ProductFormMultiStep
      isOpen={isOpen}
      onOpenChange={handleClose}
      initialData={initialDataPolitical_parties}
      onSave={handleSubmit}
      onChange={handleChange}
      steps={steps}
      options={options}
    />
  )


}

export default SheetNewPolities
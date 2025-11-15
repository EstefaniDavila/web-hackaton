import React, { useState } from "react"
import EntityFormMultiStep from "@/services/general/EntityFormMultiStep"
import ProductFormMultiStep from "@/services/polities/ProductFormWithFiles"
import { useProductSteps } from '@/composables/products/hooks/useProductsSteps'
import useEntityMutation from "@/hooks/useEntityMutation"
import useCrud from "@/hooks/useCrud"

const SheetNewPolities = ({ isOpen, handleClose, typeModal, reload, options }) => {
  const { steps, initialDataProduct, loading } = useProductSteps()
  const mutation = useEntityMutation({entityName: 'product'})

  const handleSubmit = async (formData) => {
    mutation.mutate(
      { action: 'create', entity: formData, endpoint: 'api/v1/admin/political_parties'},
      handleClose(),
    )
  }

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
      initialData={initialDataProduct}
      onSave={handleSubmit}
      onChange={handleChange}
      steps={steps}
      options={options}
    />
  )


}

export default SheetNewPolities
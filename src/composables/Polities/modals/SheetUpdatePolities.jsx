import React, {useState, useMemo} from "react"
import ProductFormMultiStep from "@/services/polities/ProductFormWithFiles"
import { usePolitiesSteps } from "../hooks/usePolitiesSteps"
import useEntityMutation from "@/hooks/useEntityMutation"

const SheetUpdatePolities = ({ isOpen, handleClose, typeModal, reload, options, product }) => {
  const { steps, initialDataProduct } = usePolitiesSteps()

  const mergedData = useMemo(() => {
    if (!product) return initialDataProduct;
    return Object.fromEntries(
      Object.entries(initialDataProduct).map(([key, value]) => [
        key,
        product[key] !== undefined && product[key] !== null ? product[key] : value,
      ])
    );
  }, [initialDataProduct, product]);

  const mutation = useEntityMutation({entityName: 'product'})

  const handleSubmit = async (formData) => {
    mutation.mutate(
      { action: 'update', entity: formData, id:product.id, endpoint: `api/v1/admin/products/${product.id}`},
      handleClose(),
    )
  }

  const handleChange = (name, value) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value }
      return updatedData
    })
  }

  return(
    <ProductFormMultiStep
      isOpen={isOpen}
      onOpenChange={handleClose}
      initialData={mergedData}
      onSave={handleSubmit}
      onChange={handleChange}
      steps={steps}
      options={options}
    />
  )


}

export default SheetUpdatePolities






import React, { useMemo } from "react"
import ProductFormMultiStep from "@/services/polities/ProductFormWithFiles"
import { usePolitiesSteps } from "../hooks/usePolitiesSteps"
import useEntityMutation from "@/hooks/useEntityMutation"

const SheetUpdatePolities = ({ isOpen, handleClose, typeModal, reload, options, product }) => {

  const { steps, initialDataPolities } = usePolitiesSteps()

  // Fusiona datos iniciales con lo que trae el partido prueb
  const mergedData = useMemo(() => {
    if (!product) return initialDataPolities
    return Object.fromEntries(
      Object.entries(initialDataPolities).map(([key, value]) => [
        key,
        product[key] !== undefined && product[key] !== null ? product[key] : value,
      ])
    )
  }, [initialDataPolities, product])

  const mutation = useEntityMutation({ entityName: 'political_parties' })

  const handleSubmit = async (formData) => {
    mutation.mutate(
      {
        action: 'update',
        entity: formData,
        id: product.id,
        endpoint: `api/v1/admin/political_parties/${product.id}`
      },
      {
        onSuccess: () => {
          reload?.()
          handleClose()
        }
      }
    )
  }

  return (
    <ProductFormMultiStep
      isOpen={isOpen}
      onOpenChange={handleClose}
      initialData={mergedData}
      onSave={handleSubmit}
      steps={steps}
      options={options}
    />
  )
}

export default SheetUpdatePolities

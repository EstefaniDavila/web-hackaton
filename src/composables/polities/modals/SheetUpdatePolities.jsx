import React, { useMemo } from "react"
import ProductFormMultiStep from "@/services/polities/ProductFormWithFiles"
import { usePolitiesSteps } from "../hooks/usePolitiesSteps" 
import useEntityMutation from "@/hooks/useEntityMutation"

const SheetUpdatePolities = ({ isOpen, handleClose, typeModal, reload, options, polity }) => {

  const { steps, initialDataPolitical_parties } = usePolitiesSteps()

  // Fusiona datos iniciales con lo que trae el partido prueb
  const mergedData = useMemo(() => {
    if (!polity) return initialDataPolitical_parties
    return Object.fromEntries(
      Object.entries(initialDataPolitical_parties).map(([key, value]) => [
        key,
        polity[key] !== undefined && polity[key] !== null ? polity[key] : value,
      ])
    )
  }, [initialDataPolitical_parties, polity])

  const mutation = useEntityMutation({ entityName: 'political_party' })

  const handleSubmit = async (formData) => {
    mutation.mutate(
      {
        action: 'update',
        entity: formData,
        id: polity.id,
        endpoint: `/api/v1/admin/political_parties/${polity.id}/update`
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
      initialData={mergedData || {}}
      onSave={handleSubmit}
      steps={steps}
      options={options}
    />
  )
}

export default SheetUpdatePolities

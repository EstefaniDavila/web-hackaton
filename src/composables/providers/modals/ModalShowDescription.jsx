import React, {useState, useMemo} from 'react'
import Modal from '@/components/custom/modal'
import { Input } from '@/components/ui/input'

const ModalShowDescription = ({ isOpen, handleClose, provider }) => {

  const [description, setDescription] = useState('')

  useMemo(() => {
      if (provider) {
        setDescription(provider.description || '')
      }
    }, [provider])

  return (
    <div>
      {isOpen && (
        <Modal
          open={isOpen}
          setOpen={handleClose}
          title="Descripción del Proveedor"
          description="Descripción detallada del proveedor."
          size="sm"
        >
          <div className="space-y-4">
            <Input
              type="text"
              name="description"
              value={description}
              disabled
            />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ModalShowDescription

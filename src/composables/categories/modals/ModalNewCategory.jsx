import React, {useState} from 'react'
import Modal from '@/components/custom/modal'
import useEntityMutation from '@/hooks/useEntityMutation'
import { Input } from '@/components/ui/input'
import { handleChange } from '@/services/general/handlers'

const ModalNewCategory = ({ isOpen, handleClose }) =>{
  const [formData, setFormData] = useState({
    name: ''
  })
  const mutation = useEntityMutation({entityName: 'category'})

  const handleSubmit = async() => {
    mutation.mutate(
      { action: 'create', entity: formData, endpoint: 'api/v1/admin/categories'},
      handleClose(),
    )
  }

  const onChangeExtra = (name, value) => {
  }

  return (
    <div>
      {isOpen && (
        <Modal
          open={isOpen}
          setOpen={handleClose}
          title="Crear Categoria"
          description="Completa el formulario para crear una nueva categoria de productos."
          size="sm"
          callBack={handleSubmit}
        >
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <label className='block text-sm font-medium py-2'>Nombre</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e)=> handleChange(e, setFormData, onChangeExtra)}
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default ModalNewCategory
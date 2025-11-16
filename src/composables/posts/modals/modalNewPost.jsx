import React, {useState} from 'react'
import Modal from '@/components/custom/modal'
import useEntityMutation from '@/hooks/useEntityMutation'
import { Input } from '@/components/ui/input'
import { handleChangeFD, handleFileFD} from '@/services/general/handlers'

const ModalNewPost = ({ isOpen, handleClose, fetchData }) => {
  const [formData] = useState(() => {
    const fd = new FormData()
    return fd;
  })
  const [formValues, setFormValues] = useState(formData)
  const mutation = useEntityMutation({entityName: 'post'})

  const handleSubmit = async() => {
    mutation.mutate(
      { action: 'create', entity: formData, endpoint: '/api/v1/admin/posts'},
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
          title="Crear Publicacion"
          description="Rellena el formulario para crear una nueva publicacion."
          size="md"
          callBack={handleSubmit}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium py-2">Título</label>
                <Input
                  type="text"
                  name="title"
                  value={formData.tittle}
                  onChange={(e) => handleChangeFD(e, formData, onChangeExtra)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium py-2">Descripción</label>
                <Input
                  type="text"
                  name="body"
                  value={formData.body}
                  onChange={(e) => handleChangeFD(e, formData, onChangeExtra)}
                />
              </div>
              <div>
                <label className="block mb-4 font-bold">
                  Contenido Multimedia
                  <Input
                    type="file"
                    name="source"
                    accept='image/*'
                    onChange={(e) => handleFileFD(e, formData, setFormValues)}
                    className="w-full p-2 mt-1 border rounded font-normal"
                  />
                </label>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default ModalNewPost
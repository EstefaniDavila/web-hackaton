import React, {useState, useMemo} from "react"
import Modal from "@/components/custom/modal"
import useEntityMutation from "@/hooks/useEntityMutation"
import { Input } from "@/components/ui/input"
import { handleChange } from "@/services/general/handlers"

const ModalUpdateCategory = ({ isOpen, handleClose, category }) => {
  const [formData, setFormData] = useState({
    name: "",
  })

  useMemo(()=>{
    if (category) {
      setFormData({
        name: category.name || '',
      })
    }
  }, [category])

  const mutation = useEntityMutation({entityName: 'category'})

  const handleSubmit = async() => {
    mutation.mutate(
      { action: 'update', entity: formData, id:category.id, endpoint: `api/v1/admin/categories/${category.id}`},
      handleClose(),
    )
  }

  const onChangeExtra = (name, value) => {
  }

  return(
    <div>
      {isOpen && (
        <Modal
          open={isOpen}
          setOpen={handleClose}
          title="Actualizar Categoria"
          description="Actualize los campos de la Categoria."
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
export default ModalUpdateCategory
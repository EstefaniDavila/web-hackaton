import React, {useState, useMemo} from 'react'
import Modal from '@/components/custom/modal'
import useEntityMutation from '@/hooks/useEntityMutation'
import { Input } from '@/components/ui/input'
import { handleChange, handleSelectChange } from '@/services/general/handlers'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

const ModalUpdateEvent = ({ isOpen, handleClose, event }) =>{
  const [formData, setFormData] = useState({
    tittle: '',
    description: '',
    date: '',
    type_member: ''
  })

  useMemo(() => {
    if (event) {
      setFormData({
        tittle: event.tittle || '',
        description: event.description || '',
        date: event.date ? event.date.split("T")[0] : "",
        type_member: event.type_member || ''
      })
    }
  }, [event])

  const mutation = useEntityMutation({entityName: 'event'})

  const handleSubmit = async() => {
    mutation.mutate(
      { action: 'update', entity: formData, id: event.id, endpoint: `api/v1/admin/events/${event.id}/update`},
      handleClose(),
    )
  }

  const onChangeExtra = (name, value) => {
  }

  const destiOptions = [
    { value: "everybody", label: 'Todos' },
    { value: "members", label: 'Solo miembros de mesa' }
  ]

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
            <div className='mb-2'>
              <label className='block text-sm font-medium'>Titulo</label>
              <Input
                type="text"
                name="tittle"
                value={formData.tittle}
                onChange={(e)=> handleChange(e, setFormData, onChangeExtra)}
                required
              />
            </div>
            <div className='mb-2'>
              <label className='block text-sm font-medium'>Descripcion</label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={(e)=> handleChange(e, setFormData, onChangeExtra)}
                required
              />
            </div>
            <div className='mb-2'>
              <label className='block text-sm font-medium'>Fecha</label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e)=> handleChange(e, setFormData, onChangeExtra)}
                required
              />
            </div>
            <div className='mb-2'>
              <label className='block text-sm font-medium'>Destinatarios</label>
              <Select
                value={formData.type_member}
                onValueChange={(value) =>
                  handleSelectChange("type_member", value, setFormData, onChangeExtra)
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  {destiOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default ModalUpdateEvent
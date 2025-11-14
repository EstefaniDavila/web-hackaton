import React, {useState} from 'react'
import Modal from '@/components/custom/modal'
import useEntityMutation from '@/hooks/useEntityMutation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { handleChange, handleSelectChange } from '@/services/general/handlers'
// import { Combobox } from '@/components/custom/combobox'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

const ModalNewProvider = ({ isOpen, handleClose, fetchData }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: "active",
    description: '',
    phone: '',
    email: ''
  })
  const mutation = useEntityMutation({entityName: 'provider'})

  const handleSubmit = async() => {
    mutation.mutate(
      { action: 'create', entity: formData, endpoint: 'api/v1/admin/providers'},
      handleClose(),
    )
  }

  const onChangeExtra = (name, value) => {
  }

  const statusOptions = [
    { value: "active", label: 'Activo' },
    { value: "inactive", label: 'Inactivo' },
    { value: "suspended", label: 'Suspendido' },
    { value: "blacklisted", label: 'Blacklisteado' },
    { value: "preferred", label: 'Preferido' }
  ]

  return (
    <div>
      {isOpen && (
        <Modal
          open={isOpen}
          setOpen={handleClose}
          title="Crear Proveedor"
          description="Rellena el formulario para crear un nuevo proveedor."
          size="md"
          callBack={handleSubmit}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium py-2">Nombre</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e, setFormData, onChangeExtra)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium py-2">Estado</label>
                {/* <Combobox
                  value={formData.status}
                  onChange={(value) =>
                    handleSelectChange("provider", value, setFormData, onChangeExtra)
                  }
                  items={[
                    { value: 'active', label: 'Activo' },
                    { value: 'inactive', label: 'Inactivo' },
                    { value: 'suspended', label: 'Suspendido' },
                    { value: 'backlisted', label: 'Blacklisteado' },
                    { value: 'preferred', label: 'Preferido' }
                  ]}
                  placeholder="Selecciona un estado"
                />  */}
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    handleSelectChange("status", value, setFormData, onChangeExtra)
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium py-2">Descripción</label>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChange(e, setFormData, onChangeExtra)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium py-2">Teléfono</label>
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange(e, setFormData, onChangeExtra)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium py-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e, setFormData, onChangeExtra)}
                />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default ModalNewProvider

import React, { useState } from "react"
import Modal from "@/components/custom/modal"
import useEntityMutation from "@/hooks/useEntityMutation"
import { Input } from "@/components/ui/input"

const ModalNewPost = ({ isOpen, handleClose, fetchData }) => {
  const { mutateAsync } = useEntityMutation({ entityName: "post" })

  const [values, setValues] = useState({
    title: "",
    body: "",
    source: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (e) => {
    setValues((prev) => ({ ...prev, source: e.target.files[0] }))
  }

  const handleSubmit = async () => {
    const fd = new FormData()
    fd.append("title", values.title)
    fd.append("body", values.body)
    if (values.source) fd.append("source", values.source)

    try {
      await mutateAsync({
        action: "create",
        entity: fd,
        endpoint: "/api/v1/admin/posts_new",
      })

      fetchData()
      handleClose()
    } catch (err) {
      console.error("Error creando post", err)
    }
  }

  return (
    isOpen && (
      <Modal
        open={isOpen}
        setOpen={handleClose}
        title="Crear Publicación"
        description="Rellena el formulario para crear una nueva publicación."
        size="md"
        callBack={handleSubmit}   // 🔥 AHORA ES SEGURO
      >
        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium py-2">Título</label>
            <Input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium py-2">Descripción</label>
            <Input
              type="text"
              name="body"
              value={values.body}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium py-2">Contenido Multimedia</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </div>

        </div>
      </Modal>
    )
  )
}

export default ModalNewPost

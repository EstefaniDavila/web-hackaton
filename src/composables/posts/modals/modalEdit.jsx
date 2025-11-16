import React, { useState, useEffect } from "react"
import Modal from "@/components/custom/modal"
import useEntityMutation from "@/hooks/useEntityMutation"
import { Input } from "@/components/ui/input"

const ModalEditPost = ({ isOpen, handleClose, fetchData, post }) => {
  const { mutateAsync } = useEntityMutation({ entityName: "post" })

  const [values, setValues] = useState({
    title: "",
    body: "",
    source: null,     // archivo nuevo
    existingSource: null // preview o URL si ya existe
  })

  // 📌 Cargar datos iniciales cuando abras el modal
  useEffect(() => {
    if (post) {
      setValues({
        title: post.title || "",
        body: post.body || "",
        source: null,
        existingSource: post.source || null,
      })
    }
  }, [post])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleFile = (e) => {
    setValues((prev) => ({
      ...prev,
      source: e.target.files[0],
      existingSource: null 
    }))
  }

  const handleSubmit = async () => {
    const fd = new FormData()
    fd.append("title", values.title)
    fd.append("body", values.body)

    if (values.source) fd.append("source", values.source)

    try {
      await mutateAsync({
        action: "update",
        entity: fd,
        endpoint: `/api/v1/admin/posts/${post.id}/update`,
      })

      fetchData()
      handleClose()
    } catch (err) {
      console.error("Error actualizando post", err)
    }
  }

  return (
    isOpen && (
      <Modal
        open={isOpen}
        setOpen={handleClose}
        title="Editar Publicación"
        description="Modifica la información de esta publicación."
        size="md"
        callBack={handleSubmit}
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
            <label className="block text-sm font-medium py-2">Contenido Multimedia</label>

            {/* Mostrar archivo existente */}
            {values.existingSource && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Archivo actual:</p>
                <img
                  src={values.existingSource}
                  alt="actual"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}

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

export default ModalEditPost

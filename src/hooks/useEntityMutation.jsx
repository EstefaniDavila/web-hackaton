import React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import useCrud from './useCrud'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { CheckCircle } from 'lucide-react'


const entityTranslations = {
  professors: "profesores",

}

const useEntityMutation = ({ entityName }) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { insertModel, updateModel, deleteModel } = useCrud()

  const mutation = useMutation({
    mutationFn: async ({ action, entity, endpoint }) => {
      const formData = new FormData()

      if (action === "create" || action === "update") {
        if (entity instanceof FormData) {
          for (const [key, value] of entity.entries()) {
            formData.append(`${entityName}[${key}]`, value);
          }
        } else {
          for (const key in entity) {
            formData.append(`${entityName}[${key}]`, entity[key])
          }
        }
      }
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      switch (action) {
        case "create":
          return await insertModel(formData, endpoint)
        case "update":
          return await updateModel(formData, endpoint)
        case "delete":
          return await deleteModel(endpoint)
        default:
          throw new Error("Acción no válida")
      }
    },
    onMutate: async ({ action, entity, id }) => {
      await queryClient.cancelQueries([entityName])
      const previousData = queryClient.getQueryData([entityName])

      queryClient.setQueryData([entityName], (old) => {
        if (action === "create") {
          return {
            ...old,
            rows: [...(old?.rows || []), entity],
            rowsCount: (old?.rowsCount || 0) + 1
          }
        } else if (action === "update") {
          if (Array.isArray(old?.rows)) {
            return {
              ...old,
              rows: old.rows.map((item) => (item.id === id ? { ...item, ...entity } : item))
            }
          } else {
            return {
              ...old,
              rows: [{ ...entity }]
            }
          }
        } else if (action === "delete") {
          if (Array.isArray(old?.rows)) {
            return {
              ...old,
              rows: old.rows.filter((item) => item.id !== id),
              rowsCount: (old?.rowsCount || 1) - 1
            }
          } else {
            return {
              ...old,
              rows: [],
              rowsCount: 0
            }
          }
        }
      })
      return { previousData }
    },
    onError: (error, { action }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([entityName], context.previousData)
      }
      const backendData = error?.response?.data || {}
      const backendMessage = backendData?.message || 'Error desconocido'
      const errorMessages = Array.isArray(backendData.errors) ? backendData.errors.join(", "): ""
      // const errorMessage = error?.errors ? error.errors.join(', ') : 'Asegúrate de tener lo requerido'
      // console.log("ERROR RAW:", error);
      // console.log("BACKEND DATA:", error?.response?.data);
      toast({
        title: `${backendMessage}.`,
        description: `${errorMessages}`,
        action: <ToastAction altText="Cerrar">Cerrar</ToastAction>,
        variant: "destructive",
        icon: <AlertCircle className="text-red-500" />,
      })
    },
    onSuccess: (data, { action }) => {
      const translatedEntityName = entityTranslations[entityName] || entityName

      toast({
        title: "Operación exitosa",
        description: `El ${translatedEntityName} se ha ${action === 'create' ? 'creado' : action === 'update' || action === 'custom_update' ? 'actualizado' : action === 'delete' ? 'eliminado' : 'procesado'} correctamente.`,
        action: <ToastAction altText="Cerrar">Cerrar</ToastAction>,
        variant: "success",
        icon: <CheckCircle className="text-green-500" />,
      })
      queryClient.invalidateQueries([entityName])
    },
    onSettled: () => {
      queryClient.invalidateQueries([entityName])
    },
  })
  return mutation
}

export default useEntityMutation

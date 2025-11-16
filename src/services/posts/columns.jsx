import React from "react"
import { Badge } from "@/components/ui/badge"
import GeneralTooltip from "@/helpers/generalTooltip"
import { TbEdit, TbTrash } from "react-icons/tb"
import { FaBoxOpen } from "react-icons/fa"

const backend_host = import.meta.env.VITE_BACKEND_HOST

const columns = (handleDelete, handleUpdate, handleShow) => [
 
  {
    accessorKey: "title",
    header: "Nombre",
    cell: (info) => info.getValue(),
  },
  {
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex space-x-4">

        <GeneralTooltip
          content="Editar Partido"
          triggerContent={
            <span className="bg-yellow-500 text-white rounded-full p-1 cursor-pointer">
              <TbEdit size={20} />
            </span>
          }
          onClick={() => handleUpdate(row.original, "edit")}
        />

        <GeneralTooltip
          content="Eliminar Partido"
          triggerContent={
            <span className="bg-red-500 text-white rounded-full p-1 cursor-pointer">
              <TbTrash size={20} />
            </span>
          }
          onClick={() => handleDelete(row.original.id)}
        />
      </div>
    ),
  },
]

export default columns;

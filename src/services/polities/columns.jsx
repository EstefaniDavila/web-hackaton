import React from "react"
import { Badge } from "@/components/ui/badge"
import GeneralTooltip from "@/helpers/generalTooltip"
import { TbEdit, TbTrash } from "react-icons/tb"
import { FaBoxOpen } from "react-icons/fa"

// Colores para estados
const typeColorVariants = {
  inactive: "bg-gray-200 text-gray-800",
  active: "bg-green-200 text-green-800",
  paused: "bg-yellow-200 text-yellow-800",
  hidden: "bg-red-200 text-red-800",
  visible: "bg-blue-200 text-blue-800",
}

// Helper para badges más limpios
const ColoredBadge = ({ value }) => {
  const color = typeColorVariants[value] || "bg-gray-300 text-gray-800"
  return (
    <Badge className={`px-2 py-1 rounded ${color}`}>
      {String(value).toUpperCase()}
    </Badge>
  )
}

const columns = (handleDelete, handleUpdate, handleShow) => [
 
  {
    accessorKey: "name",
    header: "Nombre",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "members_count",
    header: "Miembros",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "Created",
    header: "Creación",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "acronym",
    header: "Acrónimo",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: (info) => <ColoredBadge value={info.getValue()} />,
  },
  {
    accessorKey: "website",
    header: "Sitio Web",
    cell: (info) => {
      const value = info.getValue()
      return value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="text-gray-500 italic">Sin enlace</span>
      )
    },
  },
  {
    accessorKey: "plan_pdf",
    header: "Plan (PDF)",
    cell: (info) => {
      const value = info.getValue()

      return value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          Ver PDF
        </a>
      ) : (
        <span className="text-gray-500 italic">No Disponible</span>
      )
    },
  },
  {
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex space-x-4">
        <GeneralTooltip
          content="Visualizar Partido"
          triggerContent={
            <span className="bg-green-500 text-white rounded-full p-1 cursor-pointer">
              <FaBoxOpen size={20} />
            </span>
          }
          onClick={() => handleShow(row.original, "show")}
        />

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

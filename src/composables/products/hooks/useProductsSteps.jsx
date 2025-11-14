import React, {useState} from 'react';
import useFetchCategories from "@/composables/categories/hooks/useFetchCategories"
import useFetchProviders from "@/composables/providers/hooks/useFetchProviders"

export const useProductSteps = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 
  })
  const [search, setSearch] = useState("")
  const { data: categories } = useFetchCategories(pagination, search)
  const { data: providers } = useFetchProviders(pagination, search)

  const steps = [
    {
      title: 'Step 1: Información general del Producto',
      description: 'Registrar los datos básicos y descriptivos del producto',
      fields: [
        { id: 'name', label: 'Nombre:', type: 'text', required: true },
        {
          id: 'category_id',
          label: 'Categoría:',
          type: 'select',
          required: true,
          options: 
            categories?.rows?.map((cat) => ({
              value: cat.id,
              label: cat.name,
            })) || [],
        },
        {
          id: 'provider_id',
          label: 'Proveedor:',
          type: 'select',
          required: false,
          options:
            providers?.rows?.map((pro) => ({
              value: pro.id,
              label: pro.name,
            })) || [],
        },
        { id: 'description', label: 'Descripción:', type: 'text' },
        { id: 'cover', label: 'Imagen:', type: 'file', accept: 'image/*' },
      ],
    },
    {
      title: 'Step 2: Precios y descuentos',
      description: 'Definir los precios y posibles descuentos del producto',
      fields: [
        { id: 'pen_price', label: 'Precio (S/):', type: 'number', step: '0.01', required: true },
        { id: 'dollar_price', label: 'Precio ($):', type: 'number', step: '0.01' },
        { id: 'discount', label: 'Descuento (%):', type: 'number' },
      ],
    },
    {
      title: 'Step 3: Inventario y disponibilidad',
      description: 'Definir la cantidad disponible y el estado del producto',
      fields: [
        { id: 'quantity', label: 'Cantidad total:', type: 'number', required: true },
        { id: 'quantity_web', label: 'Cantidad disponible en web:', type: 'number' },
        {
          id: 'status',
          label: 'Estado interno:',
          type: 'select',
          options: [
            { value: 'inactive', label: 'Inactivo' },
            { value: 'active', label: 'Activo' },
            { value: 'paused', label: 'Pausado' },
          ],
        },
        {
          id: 'status_web',
          label: 'Estado en web:',
          type: 'select',
          options: [
            { value: 'visible', label: 'Visible' },
            { value: 'hidden', label: 'Oculto' },
          ],
        },
      ],
    },
  ]

  const initialDataProduct = {
    name: '',
    category_id: 1,
    provider_id: null,
    description: '',
    cover: null,
    cover_url: '',
    pen_price: '',
    dollar_price: '',
    discount: '',
    quantity: '',
    quantity_web: '',
    status: 0,
    status_web: 1,
  }

  return { steps, initialDataProduct }
}
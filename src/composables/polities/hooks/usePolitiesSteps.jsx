import React, { useState } from 'react';
import useFetchSelectMembers from '@/composables/members/hooks/useFetchSelectMembers';

export const usePolitiesSteps = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 
  })
  const [search, setSearch] = useState("")
  const { data: members } = useFetchSelectMembers(pagination, search)
//teps
  const steps = [
    {
      title: 'Paso 1: Información general del Partido',
      description: 'Registrar los datos básicos y descriptivos del Partido Politico',
      fields: [
        { id: 'name', label: 'Nombre:', type: 'text', required: true },
        { id: 'website', label: 'Sitio Web', type: 'text', required: true },
        { id: 'acronym', label: 'Acronimo:', type: 'text' },
        { id: 'description', label: 'Descripción:', type: 'text' },
        { id: 'hq_address', label: 'Dirección:', type: 'text' },
        { id: 'logo', label: 'Logo:', type: 'file', accept: 'image/*' },
        { id: 'plan_pdf', label: 'Plan de Gobierno:', type: 'file', accept: 'pdf/*' },
      ],
    },
    {
      title: 'Paso 2: Redes Sociales',
      description: 'Registrar link de las distintas redes sociales',
      fields: [
        { id: 'facebook_url', label: 'Facebook:', type: 'text' },
        { id: 'twitter_url', label: 'Twitter:', type: 'text' },
        { id: 'instagram_url', label: 'Instagram:', type: 'text' },
        { id: 'youtube_url', label: 'Youtube:', type: 'text' },
        { id: 'tiktok_url', label: 'Tiktok:', type: 'text' },
      ],
    },
    {
      title: 'Step 3: Otros Datos',
      description: 'Definir si el partido esta activo y otros datos',
      fields: [
        {
          id: 'member_id',
          label: 'Presidente:',
          type: 'select',
          required: true,
          options: 
            members?.map((mem) => ({
              value: mem.id,
              label: mem.full_name,
            })) || [],
        },

        { id: 'founded_at', label: 'Fecha de Fundación:', type: 'date', required: true },
        {
          id: 'status',
          label: 'Estado interno:',
          type: 'select',
          options: [
            { value: 0, label: 'Inactivo' },
            { value: 1, label: 'Activo' },
          ],
        },
      ],
    },
  ];

  const initialDataPolitical_parties = {
    name: "",
    website: "",
    acronym: "",
    logo: null,
    plan_pdf: null,
    hq_address: "",
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    youtube_url: "",
    tiktok_url: "",
    description: "",
    founded_at: "",
    member_id: "",
    status: 1,
  };

  return { steps, initialDataPolitical_parties };
};

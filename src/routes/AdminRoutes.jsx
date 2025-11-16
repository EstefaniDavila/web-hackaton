import React, { lazy } from 'react'
import GeneralError from '@/pages/general/errors/general-error'
import PrivateRoute from './../utils/PrivateRoutes'

const adminRoutes = [
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        lazy: async () => {
          const AppShell = await import('../components/app-shell')
          return { Component: AppShell.default }
        },
        errorElement: <GeneralError />,
        children: [
          { index: true, lazy: async () => ({ Component: (await import('./../pages/panels/admin/dashboard/Dashboard')).default }) },
          {
            path: 'Partidos',lazy: async () => ({ Component: (await import('../pages/panels/admin/polities/Polities')).default }),
            errorElement: <GeneralError />,
          }, 
          {
            path: 'Publicaciones',lazy: async () => ({ Component: (await import('../pages/panels/admin/posts/Post')).default }),
            errorElement: <GeneralError />,
          },
          {
            path: 'Eventos',lazy: async () => ({ Component: (await import('../pages/panels/admin/events/events')).default }),
            errorElement: <GeneralError />,
          },  
          {
            path: 'ajustes',
            lazy: async () => ({ Component: (await import('../pages/general/settings')).default }),
            errorElement: <GeneralError />,
            children: [
              { index: true, lazy: async () => ({ Component: (await import('../pages/general/settings/profile')).default }) },
              { path: 'cuenta', lazy: async () => ({ Component: (await import('../pages/general/settings/account')).default }) },
              { path: 'apariencia', lazy: async () => ({ Component: (await import('../pages/general/settings/appearance')).default }) },
              { path: 'notificaciones', lazy: async () => ({ Component: (await import('../pages/general/settings/notifications')).default }) },
              { path: 'display', lazy: async () => ({ Component: (await import('../pages/general/settings/display')).default }) },
            
            ],
          },
        ],
      },
    ],
  },
]

export default adminRoutes


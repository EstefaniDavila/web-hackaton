import React, { lazy } from 'react'
import GeneralError from '@/pages/general/errors/general-error'
import PrivateRoute from './../utils/PrivateRoutes'

const memberRoutes = [
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
          { index: true, lazy: async () => ({ Component: (await import('./../pages/panels/member/dashboard/Dashboard')).default }) },
           {
              path: 'Candidatos',lazy: async () => ({ Component: (await import('../pages/panels/member/candidant/politicalPartie')).default }),
              errorElement: <GeneralError />,
            }, 
            {
              path: 'Calendario',lazy: async () => ({ Component: (await import('../pages/panels/member/Events/events')).default }),
              errorElement: <GeneralError />,
            },
            {
              path: 'Votaciones',lazy: async () => ({ Component: (await import('../pages/panels/member/vote/Vote')).default }),
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

export default memberRoutes


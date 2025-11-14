import { Outlet } from 'react-router-dom'
import {
  TbNotification,
  TbPalette,
  TbTool,
  TbUser,
} from 'react-icons/tb'
import { Separator } from '@/components/ui/separator'
import SidebarNav from './components/sidebar-nav'
export default function Settings() {
  return (
    <>
      <div className='space-y-0.5'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Configuración
        </h1>
        <p className='text-muted-foreground'>
          Administra la configuración de tu cuenta y establece preferencias de correo electrónico.
        </p>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-1 flex-col space-y-8 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='sticky top-0 lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='w-full p-1 pr-4 lg:max-w-xl'>
          <div className='pb-16'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

const sidebarNavItems = [
  {
    title: 'Perfil',
    icon: <TbUser size={18} />,
    href: '/ajustes',
  },
  {
    title: 'Cuenta',
    icon: <TbTool size={18} />,
    href: '/ajustes/cuenta',
  },
  // {
  //   title: 'Apariencia',
  //   icon: <TbPalette size={18} />,
  //   href: '/ajustes/apariencia',
  // },
  // {
  //   title: 'Notificaciones',
  //   icon: <TbNotification size={18} />,
  //   href: '/ajustes/notificaciones',
  // }
]
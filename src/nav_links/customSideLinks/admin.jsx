import {
  TbLayoutDashboard,
  TbSettings,
} from "react-icons/tb"
import { GrSelection } from "react-icons/gr"
import { BsFillCalendarEventFill } from "react-icons/bs";

export const adminLinks = [
  
  {
    title: 'Partidos',
    label: '',
    href: '/partidos',
    icon: <GrSelection  size={18} />,
  },
  {
    title: 'Publicaciones',
    label: '',
    href: '/publicaciones',
    icon: <TbLayoutDashboard  size={18} />,
  },
  {
    title: 'Eventos',
    label: '',
    href: '/eventos',
    icon: <BsFillCalendarEventFill  size={18} />,
  },
  {
    title: 'Ajustes',
    label: '',
    href: '/ajustes',
    icon: <TbSettings size={18} />,
  },
]

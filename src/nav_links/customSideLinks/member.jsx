import {
  TbLayoutDashboard,
  TbSettings,
  TbUsers,
  TbCalendar,
} from "react-icons/tb"
import { MdOutlineHowToVote } from "react-icons/md";

export const memberLinks = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <TbLayoutDashboard size={18} />,
  },
  {
    title: 'Candidatos',
    label: '',
    href: '/candidatos',
    icon: <TbUsers size={18} />,
  },
  {
    title: 'Calendario',
    label: '',
    href: '/calendario',
    icon: <TbCalendar size={18} />,
  },
  {
    title: 'Votaciones',
    label: '',
    href: '/votaciones',
    icon: <MdOutlineHowToVote size={18} />,
  },
  {
    title: 'Ajustes',
    label: '',
    href: '/ajustes',
    icon: <TbSettings size={18} />,
  },
]
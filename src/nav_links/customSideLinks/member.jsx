import {
  TbLayoutDashboard,
  TbSettings,
  TbBook,
} from "react-icons/tb"
import { FaCalendar } from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";



export const memberLinks = [

  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <TbLayoutDashboard size={18} />,
  },
 
  {
    title: 'Ajustes',
    label: '',
    href: '/ajustes',
    icon: <TbSettings size={18} />,
  },
  {
    title: 'Candidatos',
    label: '',
    href: '/candidatos',
    icon: <TbSettings size={18} />,
  },
  {
    title: 'Calendario',
    label: '',
    href: '/calendario',
    icon: <FaCalendar size={18} />,
  },
  {
    title: 'Votaciones',
    label: '',
    href: '/votaciones',
    icon: <MdOutlineHowToVote size={18} />,
  },
]

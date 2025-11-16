import {
  TbLayoutDashboard,
  TbSettings,
  TbUsers,
  TbCalendar,
} from "react-icons/tb"
import { MdOutlineHowToVote } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";


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
    title: 'Donde Votar',
    label: '',
    href: '/dondevotar',
    icon: <GrMapLocation size={18} />,
  },
  {
    title: 'Votaciones',
    label: '',
    href: '/sufragio',
    icon: <MdOutlineHowToVote size={18} />,
  },
  {
    title: 'Ajustes',
    label: '',
    href: '/ajustes',
    icon: <TbSettings size={18} />,
  },
]
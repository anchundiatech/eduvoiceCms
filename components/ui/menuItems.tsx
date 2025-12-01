import {
  Home,
  MessageSquare,
  Tag,
  Folder,
  Users,
  Settings,
} from 'lucide-react';
import { SidebarItemType } from '@/types/sidebar';

export const adminMenu: SidebarItemType[] = [
  { label: 'Inicio', href: '/home', icon: <Home /> },
  {
    label: 'Testimonios',
    href: '/testimonios',
    icon: <MessageSquare />,
  },

  { label: 'Categorías', href: 'categorias', icon: <Folder /> },
  { label: 'Etiquetas', href: '/etiquetas', icon: <Tag /> },
  { label: 'Usuarios', href: '/users', icon: <Users /> },
  { label: 'Ajustes', href: '/ajustes', icon: <Settings /> },
];

export const editorMenu: SidebarItemType[] = [
  { label: 'Inicio', href: 'home', icon: <Home /> },
  {
    label: 'Testimonios',
    href: '/dashboard/testimonios',
    icon: <MessageSquare />,
  },
  { label: 'Categorías', href: '/categorias', icon: <Folder /> },
  { label: 'Etiquetas', href: '/etiquetas', icon: <Tag /> },
  { label: 'Usuarios', href: '/users', icon: <Users /> },
  { label: 'Ajustes', href: '/ajustes', icon: <Settings /> },
];

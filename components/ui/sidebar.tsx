"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { SidebarItem, SidebarItemProps } from './SidebarItem';
import { SidebarItemType } from '@/types/sidebar';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  topOffset?: number; // altura del navbar
  items: SidebarItemType[]; // puedes tiparlo luego
}

export const Sidebar = ({ items, isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <>
      {/* Overlay en móvil */}
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/40 z-30 md:hidden" />}

      <aside
        className={`
          fixed left-0 z-40 w-[260px] h-screen  top-14
          bg-white shadow-xl p-4 rounded-tr-2xl rounded-br-2xl
          transition-transform duration-300 md:translate-x-0 md:relative`,
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col  gap-2">
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              {...item}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

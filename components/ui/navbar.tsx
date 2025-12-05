"use client";
import { Menu } from 'lucide-react';
import SignoutBtn from '@/components/auth/SignoutBtn';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { BsPersonFill } from 'react-icons/bs';

export const Navbar = ({ onToggle }: { onToggle: () => void }) => {
  const { data: session } = useSession();
  const name = session?.user?.name ?? 'Usuario';

  return (
    <header className="fixed  justify-between h-16 top-0 left-0 w-full  bg-white shadow flex items-center px-4 z-50">
      <button className="md:hidden" onClick={onToggle}>
        <Menu className="w-6 h-6" />
      </button>

      {/*<h1 className="ml-4 font-semibold text-lg">Dashboard</h1>*/}

      <div className="flex gap-3 ">
        <Image
          src="/EduVoiceCMS_logo-SN.png"
          alt="EduVoice CMS Logo"
          width={40}
          height={40}
          className="h-8 w-auto md:h-10"
        />
        <span className="text-2xl font-semibold text-brand-blue mt-1">
          EduVoice CMS
        </span>
      </div>
      <div className="flex  items-center gap-4">
        <div className="flex flex-col items-center">
          {' '}
          <BsPersonFill />
          {name}
        </div>
        <SignoutBtn></SignoutBtn>
      </div>
    </header>
  );
};

"use client";

import Link   from 'next/link'
import Image  from 'next/image';

import { MdOutlineSpaceDashboard }            from "react-icons/md";
import { FaRegUser, FaRegFolder, FaRegEdit }  from "react-icons/fa";
import { LuArrowLeftFromLine, LuBrain }       from "react-icons/lu";
import { IoMdMenu }                           from "react-icons/io";
import { IoColorPaletteOutline }              from "react-icons/io5";
import { usePathname }                        from 'next/navigation';
import { useSidebar }                         from "@/contexts/SidebarContext";
import { ThemeSwitcher }                      from "@/components/UI/ThemeSwitcher";
import SignOutButton                          from '@/components/UI/signoutbutton';

export default function Sidebar() {

  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  const elements = [
    { name: "Tableau de bord",  icon: <MdOutlineSpaceDashboard />, link: "dashboard" },
    { name: "Profile",          icon: <FaRegUser />, link: "dashboard/profile" },
    { name: "Mes compétences",  icon: <LuBrain />, link: "dashboard/skills" },
    { name: "Mes projets",      icon: <FaRegFolder />, link: "dashboard/projects" },
    { name: "Editer",           icon: <FaRegEdit />, link: "dashboard/edit" },
    { name: "Thème",            icon: <IoColorPaletteOutline fontSize={22} />, link: "dashboard/theme" },
  ];

  return (
    <>
      <div className="h-screen p-2 fixed duration-300">
        <div className={`flex flex-col justify-between h-full rounded-xl p-5 border-2 border-gray-200 dark:border-[#2C2D33] bg-[#f5f5f5] dark:bg-[#191919] w-[80px] duration-300 ${isOpen ? 'lg:w-[300px]' : ''}`}>
          <div>
            <div className={`flex items-center justify-between mb-10 ${isOpen ? '' : 'flex-col gap-5'}`}>
              <div className="flex items-center gap-2">
                <Image src="/foliode-icon.svg" alt="logo foliode" width={40} height={40} />
                <p className={`text-26 font-normal ${isOpen ? 'block' : 'hidden'}`}>Foliode</p>
              </div>
              
              {isOpen ? 
                <button 
                  onClick={toggle}
                  className="dayMode transition-colors hidden text-xl lg:block"
                >
                  <LuArrowLeftFromLine />
                </button> 
                :  
                <button 
                  onClick={toggle}
                  className="dayMode transition-colors hidden text-xl lg:block"
                >
                  <IoMdMenu />
                </button>
              }
            </div>

            <div>
              {elements.map((element, index) => {
                const isActive = pathname === `/${element.link}`;
                return (
                <Link 
                  href={`/${element.link}`} 
                  key={index} 
                  className={`dayMode flex items-center gap-3 py-2 px-3 my-3 rounded-lg cursor-pointer duration-200 hover:text-white hover:bg-primary justify-center ${isActive ? 'bg-primary !text-white' : ''} ${isOpen ? 'lg:justify-start' : ''}`}
                >
                  <span className="text-xl">{element.icon}</span>
                  <span className={`hidden ${isOpen ? 'lg:block' : ''}`}>{element.name}</span>
                </Link>
                );
              })}
            </div>
          </div>
          
          <div className={`flex flex-col gap-3 ${isOpen ? 'items-start' : 'items-center'}`}>
            <ThemeSwitcher isOpen={isOpen} />
            <SignOutButton isOpen={isOpen} />
          </div>
        </div>
      </div>
    </>
  )
}
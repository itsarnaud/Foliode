
"use client";

import Link from 'next/link'
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
        <div className={` flex flex-col justify-between h-full rounded-xl p-5 border-2 border-[#2C2D33] bg-[#f5f5f5] dark:bg-[#191919] w-[80px] duration-300 ${isOpen ? 'lg:w-[300px]' : ''}`}>
          <div>
            <div className={`flex items-center justify-between mb-10 ${isOpen ? '' : 'flex-col gap-5'}`}>
              <div>
                <img
                  src="/foliode-logo.svg"
                  alt="Logo"
                  width={150}
                  className={`hidden ${isOpen ? 'lg:block' : ''}`}
                />
                <img
                  src="/foliode-icon.svg"
                  alt="Logo"
                  width={40}
                  className={`block ${isOpen ? 'lg:hidden' : 'lg:block'}`}
                />
              </div>

              {isOpen ?
              <button
                onClick={toggle}
                className="hover:text-white text-foreground transition-colors hidden text-xl lg:block"
              >
                <LuArrowLeftFromLine />
              </button>
              :
              <button
                onClick={toggle}
                className="hover:text-white text-foreground transition-colors hidden text-xl lg:block"
              >
                <IoMdMenu />
              </button>}

            </div>

            <div>
              {elements.map((element, index) => {
                const isActive = pathname === `/${element.link}`;
                return (
                <Link
                  href={`/${element.link}`}
                  key={index}
                  className={`flex items-center gap-3 py-2 px-3 my-3 rounded-lg cursor-pointer duration-200 text-foreground hover:text-white hover:bg-primary-200 justify-center ${isActive ? 'bg-primary-200 !text-white' : ''} ${isOpen ? 'lg:justify-start' : ''}`}
                >
                  <span className="text-xl">{element.icon}</span>
                  <span className={`hidden ${isOpen ? 'lg:block' : ''}`}>{element.name}</span>
                </Link>
                );
              })}
            </div>
          </div>

          <div>
            <div
            className={`bg-[#f5f5f5] dark:bg-[#191919] flex items-center gap-3 py-2 px-3 my-3 rounded-lg cursor-pointer duration-200 text-foreground hover:text-white justify-center ${isOpen ? 'lg:justify-start' : ''}`}>
              <ThemeSwitcher />
            </div>
            <SignOutButton isOpen={isOpen} />
          </div>
        </div>
      </div>
    </>
  )
}
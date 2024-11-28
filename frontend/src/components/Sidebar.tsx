// TODO: Trouver un moyen de virer le use client (pas bon pour les perfs), il est appelé à cause du hook usePathname qui permet de savoir dans quel page nous somme
// TODO: Il sert à mettre en surbrillance le lien selon la page où on est

"use client";

import Link from 'next/link'
import { MdOutlineSpaceDashboard, MdLogout } from "react-icons/md";
import { FaRegUser, FaRegFolder, FaRegEdit } from "react-icons/fa";
import { LuBrain } from "react-icons/lu";
import { usePathname } from 'next/navigation';


export default function Sidebar() {

  const pathname = usePathname();

  
  const elements = [
    { name: "Tableau de bord",  icon: <MdOutlineSpaceDashboard />, link: "dashboard" },
    { name: "Profile",          icon: <FaRegUser />, link: "dashboard/profile" },
    { name: "Mes compétences",  icon: <LuBrain />, link: "dashboard/skills" },
    { name: "Mes projets",      icon: <FaRegFolder />, link: "dashboard/projects" },
    { name: "Editer",           icon: <FaRegEdit />, link: "dashboard/edit" },
  ];

  return (
    <>
      <div className="h-screen p-2 fixed">
        <div className="darkMode flex flex-col justify-between h-full lg:w-[300px] w-[80px] rounded-xl p-5 border-2 border-[#2C2D33] bg-foreground duration-300">
          <div>
            <img 
              src="/foliode-logo.svg" 
              alt="Logo" 
              width={150} 
              className="mb-10 hidden lg:block" 
            />
            <img 
              src="/foliode-icon.svg" 
              alt="Logo" 
              width={40} 
              className="mb-10 mx-auto block lg:hidden" 
            />

            <div>
              {elements.map((element, index) => {
                const isActive = pathname === `/${element.link}`;
                return (
                <Link 
                  href={`/${element.link}`} 
                  key={index} 
                  className={`flex items-center gap-3 py-2 px-3 my-3 rounded-lg cursor-pointer duration-200 text-[#B0B5BB] hover:text-white hover:bg-primary-200 lg:justify-start justify-center ${isActive ? 'bg-primary-200 !text-white' : ''}`}
                >
                  <span className="text-xl">{element.icon}</span>
                  <span className="hidden lg:block">{element.name}</span>
                </Link>
                );
              })}
            </div>
          </div>

          <Link 
            href="/logout" 
            className="flex items-center gap-3 py-2 px-3 my-3 rounded-lg cursor-pointer duration-200 text-[#B0B5BB] hover:text-white hover:bg-primary-200 lg:justify-start justify-center"
          >
            <span className="text-xl"><MdLogout /></span>
            <span className="hidden lg:block">Se déconnecter</span>
          </Link>
        </div>
      </div>
    </>
  )
}
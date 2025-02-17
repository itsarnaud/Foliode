"use client";
import DashboardTitle from "@/components/DashboardTitle";
import FourStepForm from "@/components/form/multistepform/FourStepForm";
import { useEffect } from "react";
import { useMultiStep } from "@/utils/store";
import { apiPut } from "@/utils/apiRequester";
import { usePathname } from 'next/navigation';
import { useSidebar } from "@/contexts/SidebarContext";
import { FaRegUser, FaRegFolder, FaRegEdit }  from "react-icons/fa";
import Link from 'next/link';
import { LuArrowLeftFromLine, LuBrain }       from "react-icons/lu";
import { IoMdMenu }                           from "react-icons/io";




export default function NavbarEdit() {


  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  const elements = [
    { name: "Portfolio Web", icon: <FaRegEdit />, link: "dashboard/edit/portfolioWeb" },
    { name: "Portfolio Présentation", icon: <FaRegEdit />, link: "dashboard/edit/portfolioPres" },
  ];

  return (
    <>
    <nav className=" rounded-xl bg-[#f5f5f5] dark:bg-[#191919] shadow-md border-b-2 border-[#2C2D33] p-2">
      <div className="container flex items-center">
        <div className="flex space-x-4">
          {elements.map((element, index) => {
            const isActive = pathname === `/${element.link}`;
            return (
              <Link 
                href={`/${element.link}`} 
                key={index} 
                className={`flex items-center gap-2 py-2 px-4 rounded-lg duration-200 text-foreground hover:text-white hover:bg-primary-200 ${isActive ? 'bg-primary-200 !text-white' : ''}`}
              >
                <span className="text-xl">{element.icon}</span>
                <span>{element.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
        </>
      );

}
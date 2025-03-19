'use client';

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";

export function ThemeSwitcher({ isOpen = false }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="dayMode flex items-center cursor-pointer group">
      <span 
        className="flex items-center px-3 cursor-pointer duration-300 group-hover:text-primary-200"
      >
        {theme == 'light' ? (
          <FiSun className="dayMode text-lg text-foreground duration-300 group-hover:text-primary-200" />
        ) : (
          <IoMdMoon className="dayMode text-lg text-background duration-300 group-hover:text-primary-200" />
        )}
      </span>
      {isOpen && <span className="hidden lg:block duration-300 group-hover:text-primary-200"> {theme === 'light' ? 'Mode jour' : 'Mode nuit'}</span>}
    </div>
  );
}
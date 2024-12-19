'use client';

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex items-center gap-3 py-2 px-3 my-3 rounded-lg cursor-pointer duration-200 text-[#B0B5BB] hover:bg-primary-200 justify-center w-10 h-10 bg-transparent"
      suppressHydrationWarning
    >
      {theme === 'light' ? (
        <FiSun className="text-xl text-[#B0B5BB]" />
      ) : (
        <IoMdMoon className="text-xl text-[#B0B5BB]" />
      )}
    </button>
  );
}
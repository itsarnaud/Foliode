'use client';

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FiSun } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="light"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className=" nightMode transition-all duration-300 hover:bg-primary-200"
      isIconOnly
    >
      {theme === 'light' ? (
        <FiSun className="text-xl text-[#B0B5BB] " />
      ) : (
        <IoMdMoon className="text-xl text-[#B0B5BB]" />

      )}
    </Button>
  );
}
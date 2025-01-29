"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import Image from 'next/image';
import { ThemeSwitcher } from "./ThemeSwitcher";
import { getDecodedToken } from "@/utils/jwtUtils";
import { Avatar } from "@/components/Avatar";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

export const FoliodeLogo = () => {
  return (
    <Image src="/foliode-icon.svg" alt="logo foliode" width={25} height={25} />
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = getDecodedToken();
  const router = useRouter();

  const handleSignOut = () => {
    document.cookie = "token_auth=; max-age=0; path=/;";
    router.push("/login");
  };

  const menuItems = [
    "Accueil",
    "Avantages",
    "Fonctionnalités",
    "Contact",
    "Login",
    "Sign Up",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="backdrop-blur-none z-50 bg-background/100 p-0">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="gap-2">
          <FoliodeLogo />
          <p className="text-26 font-normal">Foliode</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-9" justify="center">
        <NavbarItem>
          <Link className="dayMode text-20" aria-current="page" href="#accueil">
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="dayMode text-20" color="foreground" href="#avantages">
            Avantages
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="dayMode text-20" color="foreground" href="#fonctionnalites">
            Fonctionnalités
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        {token ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Avatar size={40} />
            </NavbarItem>
            <NavbarItem>
              <Button
                onPress={handleSignOut}
                className="gap-9 text-20 bg-transparent p-0 box-border border-2 border-white/[0.04] rounded-[32px] shadow-[inset_0px_2px_0px_0px_rgba(141,169,162,0.33),inset_0px_-2px_0px_0px_rgba(141,169,162,0.33)]"
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                href="/login"
                className="gap-9 text-20 bg-transparent p-0 box-border border-2 border-white/[0.04] rounded-[32px] shadow-[inset_0px_2px_0px_0px_rgba(141,169,162,0.33),inset_0px_-2px_0px_0px_rgba(141,169,162,0.33)]"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button className="text-20 bg-transparent p-0" as={Link} href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={index === menuItems.length - 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
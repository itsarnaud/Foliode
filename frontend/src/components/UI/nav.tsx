'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Link,
  Button,
} from '@heroui/react';

import Image from 'next/image';

import React, { useState, useEffect } from 'react';
import { getDecodedToken }            from '@/utils/jwtUtils';
import { Avatar }                     from '@/components/Avatar';
import { User }                       from '@/interfaces/User';
import { ThemeSwitcher }              from './ThemeSwitcher';
import { useRouter }                  from 'next/navigation';
import { links }                      from '@/data/nav/links';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const decodedToken = getDecodedToken();
    setToken(decodedToken);
  }, []);

  const handleSignOut = () => {
    document.cookie = "token_auth=; max-age=0; path=/;";
    router.push("/");
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="backdrop-blur-none z-50 bg-background/100 p-0">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="gap-2">
          <Image src="/foliode-icon.svg" alt="logo foliode" width={25} height={25} />
          <p className="text-26 font-normal">Foliode</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-9" justify="center">
        {links.map((link, index) => (
          <NavbarItem key={index}>
            <Link className="dayMode text-20" aria-current="page" href={link.href}>
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-3">
        {token ? (
          <>
            <NavbarItem>
              <Button
                onPress={handleSignOut}
                className="gap-9 bg-transparent p-3 box-border border-2 border-white/[0.04] rounded-[32px] shadow-[inset_0px_2px_0px_0px_rgba(141,169,162,0.33),inset_0px_-2px_0px_0px_rgba(141,169,162,0.33)]"
              >
                Déconnexion
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Avatar size={40} />
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                href="/login"
                className="bg-transparent p-3 box-border border-2 border-white/[0.04] rounded-[32px] shadow-[inset_0px_2px_0px_0px_rgba(141,169,162,0.33),inset_0px_-2px_0px_0px_rgba(141,169,162,0.33)]"
              >
                Connexion
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Link className="dayMode text-20" color="foreground" href="/signup">
                Inscription
              </Link>
            </NavbarItem>
          </>
        )}

        <NavbarItem className='ml-2'>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className='z-50'>
        {links.map((link, index) => (
          <NavbarItem key={index}>
            <Link
              className="w-full"
              color="foreground"
              href={link.href}
              size="lg"
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
        {token ? (
          <NavbarItem>
            <Link
              onPress={handleSignOut}
              className="w-full"
              color="danger"
              size="lg"
            >
              Déconnexion
            </Link>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Link
                className="w-full dayMode"
                href="/login"
                color="primary"
                size="lg"
              >
                Connexion
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                className="w-full dayMode"
                href="/signup"
                color="primary"
                size="lg"
              >
                Inscription
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";


interface NavPortfolioProps {
  className?: string;
  style?: React.CSSProperties;
  justify?: "start" | "center" | "end";
}

const NavPortfolio: React.FC<NavPortfolioProps> = ({ className, style, justify = "end" }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`sm:bg-transparent sm:backdrop-blur-none sm:backdrop-saturate-100 relative ${className}`}
      style={style}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className={`hidden sm:flex gap-4 grow`} justify={justify}>
        <NavbarItem>
          <Link color="foreground" href="#home">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#qui-je-suis">
            Qui je suis
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#mes-projets">
            Mes projets
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#mes-competences">
            Mes competences
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#home" size="lg">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#qui-je-suis" size="lg">
            Qui je suis
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#mes-projets" size="lg">
            Mes projets
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#mes-competences" size="lg">
            Mes competences
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavPortfolio;
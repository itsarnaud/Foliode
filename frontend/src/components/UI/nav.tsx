import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Image from 'next/image';

export const FoliodeLogo = () => {
  return (
    <Image src="/foliode-icon.svg" alt="logo foliode" width={25} height={25} />
  );
};

export default function App() {
  return (
    <Navbar className="backdrop-blur-none z-50 ">
      <NavbarBrand className="gap-2">
        <FoliodeLogo />
        <p className="text-26 font-normal">Foliode</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-9" justify="center">
        <NavbarItem>
          <Link className="dayMode text-20 text-black" aria-current="page" href="#">
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="dayMode text-20 text-black" color="foreground" href="#">
          Avantages
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="dayMode text-20 text-black" color="foreground" href="#">
          Fonctionnalités
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="dayMode text-20 text-black" color="foreground" href="#">
          Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-9">
        <NavbarItem className="hidden lg:flex">
          <Button className="gap-9 text-20 bg-transparent p-0 text-black box-border border-2 border-white/[0.04] rounded-[32px] shadow-[inset_0px_2px_0px_0px_rgba(141,169,162,0.33),inset_0px_-2px_0px_0px_rgba(141,169,162,0.33)]" href="#">Login</Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="text-20 bg-transparent p-0 text-black " as={Link} href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

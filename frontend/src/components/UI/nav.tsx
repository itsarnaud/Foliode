import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Image from 'next/image';

export const FoliodeLogo = () => {
  return (
    <Image src="/foliode-icon.svg" alt="logo foliode" width={25} height={25} />
  );
};

export default function App() {
  return (
    <Navbar>
      <NavbarBrand className="gap-2">
        <FoliodeLogo />
        <p className="text-26 font-normal">Foliode</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-9" justify="center">
        <NavbarItem>
          <Link className="text-20" aria-current="page" href="#">
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-20" color="foreground" href="#">
          Avantages
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-20" color="foreground" href="#">
          Fonctionnalités
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-20" color="foreground" href="#">
          Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-9">
        <NavbarItem className="hidden lg:flex">
          <Link className="text-20" href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button className="text-20 bg-transparent p-0 " as={Link} href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

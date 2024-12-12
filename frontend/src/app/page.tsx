import styles       from "./page.module.css";
import GithubAuth   from "../components/GitHub/GithubAuth";
import DribbbleAuth from "@/components/Dribbble/DribbbleAuth";
import SignOut      from "../components/SignOut";
import Nav from "../components/UI/nav";
import BgLandingPage from '../components/landingpage/bg-landingpage';
import Avantages from "@/components/landingpage/Avantages";
import Fonctionnalites from "@/components/landingpage/Fonctionnalites";
import Eval from "@/components/landingpage/eval";
import Footer from "@/components/UI/footer";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
export default function Home() {
  return (
    <div className={styles.page}>
      <Nav></Nav>
       <BgLandingPage />
        <Avantages />
        <Fonctionnalites />
        <Eval />
        <Footer />

     
    </div>
  );
}

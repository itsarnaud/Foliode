import styles       from "./page.module.css";
import Nav from "../components/UI/nav";
import BgLandingPage from '../components/landingpage/bg-landingpage';
import Avantages from "@/components/landingpage/Avantages";
import Fonctionnalites from "@/components/landingpage/Fonctionnalites";
import Eval from "@/components/landingpage/eval";
import Footer from "@/components/UI/footer";
export default function Home() {
  return (
    <div className={styles.page}>
      <Nav/>
      <BgLandingPage />
      <Avantages />
      <Fonctionnalites />
      <Eval />
      <Footer />
    </div>
  );
}

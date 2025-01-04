import BantoFlow from "@/components/template/BantoFlow";
import EmeraldFlow from "@/components/template/EmeraldFlow";
import PrestigeNoir from "@/components/template/PrestigeNoir";
import { Portfolio } from "@/interfaces/Portfolio";
import { apiGet } from "@/utils/serverApiRequester";

async function PortfolioPage({
  params,
}: {
  params: { name: string; lastname: string };
}) {
  try {
    const response = await apiGet(
      `public/portfolio/${params.name}/${params.lastname}`
    );

    const portfolio: Portfolio = response.data;
    const template = portfolio.template;

    if (template === "banto") {
      return <BantoFlow portfolio={portfolio} />;
    }

    if (template === "emerald") {
      return <EmeraldFlow portfolio={portfolio} />;
    }

    if (template === "prestige") {
      return <PrestigeNoir portfolio={portfolio} />;
    }
  } catch (error) {
    console.log(error);
    return <h1>404 - not found</h1>;
  }
}

export default PortfolioPage;

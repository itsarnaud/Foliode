import EmeraldFlow from "@/components/tamplettes/EmeraldFlow";
import NextFlow from "@/components/tamplettes/NextFlow";
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

    return < NextFlow portfolio={portfolio} />;
  } catch (error) {
    console.log(error);
    return <h1>404 - not found</h1>;
  }
}

export default PortfolioPage;

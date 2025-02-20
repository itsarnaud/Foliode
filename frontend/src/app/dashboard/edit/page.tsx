"use client";

import DashboardTitle from "@/components/DashboardTitle";
import FourStepForm   from "@/components/form/multistepform/FourStepForm";

import { useEffect }    from "react";
import { useReceivedPortfolio } from "@/utils/store";
import {apiGetWithAuth} from "@/utils/apiRequester";
import {Link} from "@heroui/react";

export default function Projects() {
  const {portfolio, setPortfolio} = useReceivedPortfolio();

  useEffect(() => {
    if (portfolio == null) {
      fetchPortfolio()
    }

  }, []);

  const fetchPortfolio = async () => {
    const response = await apiGetWithAuth("portfolio");
    if (response.status === 200) {
      setPortfolio(response.data);
    }
  };



  return (
    <>

      <DashboardTitle title="Portfolio " />
      <div className="p-4">

      </div>

      <div className="p-4">
        <FourStepForm />
      </div>
    </>
  );
}
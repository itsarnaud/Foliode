import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
export default function Eval() {
  return (
    <>
      <div className="px-8 mt-36">
        <Image
          className=" dayMode z-40 text-center mx-auto  rounded-3xl  border-[26px] border-[#2B4557] "
          alt="NextUI hero Image"
          src="/Prof Dashboard.png"
          width={1200}
          height={794}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-center px-8  ">
        <Card className="max-w-[400px] bg-transparent rounded-none shadow-none border border-[#393939] md:border-r-0">
          <CardHeader className="flex gap-3 pb-11 pt-9 px-8">
            <p className="text-md font-semibold">
              Création de classes simplifiée
            </p>
          </CardHeader>
          <CardBody className="pt-0 pb-7 px-8 font-normal">
            <p>
              Organisez facilement vos étudiants en classes et accédez à leurs
              portfolios en un seul clic.
            </p>
          </CardBody>
        </Card>
        <Card className="max-w-[400px] bg-transparent rounded-none shadow-none border border-[#393939]">
          <CardHeader className="flex gap-3 pb-11 pt-9 px-8">
            <p className="text-md font-semibold">
              Évaluation centralisée des portfolios
            </p>
          </CardHeader>
          <CardBody className="pt-0 pb-7 px-8 font-normal">
            <p>
              Attribuez des notes, laissez des commentaires, et suivez les
              progrès de chaque étudiant sur une interface intuitive.
            </p>
          </CardBody>
        </Card>
        <Card className="max-w-[400px] bg-transparent rounded-none shadow-none border border-[#393939] md:border-l-0">
          <CardHeader className="flex gap-3 pb-11 pt-9 px-8">
            <p className="text-md font-semibold">
              Aligné avec vos objectifs pédagogiques
            </p>
          </CardHeader>
          <CardBody className="pt-0 pb-7 px-8 font-normal">
            <p>
              Adaptez vos critères d’évaluation aux apprentissages critiques des
              formations BUT.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

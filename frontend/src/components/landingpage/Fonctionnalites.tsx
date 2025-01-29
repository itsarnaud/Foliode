import { Card, CardHeader, CardBody } from "@heroui/react";

export default function Fonctionnalites() {
  return (
    <>
      <h2 className="text-4xl font-bold mb-20 text-center mt-36">
      Pourquoi choisir Foliode
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 px-8">
        <Card className="max-w-[400px]  mx-auto ">
          <CardHeader className="flex gap-3 pb-5 pt-8 px-8">
            <p className="text-md font-semibold">
              Orienté pour les formations BUT.
            </p>
          </CardHeader>
          <CardBody className="pt-0 pb-7 px-8 font-normal">
            <p>
              Un outil pensé spécifiquement pour répondre aux besoins des
              étudiants et enseignants en BUT.
            </p>
          </CardBody>
        </Card>
        <Card className="max-w-[400px]  mx-auto ">
          <CardHeader className="flex gap-3 pb-5 pt-8 px-8">
            <p className="text-md font-semibold">
              Orienté pour les formations BUT.
            </p>
          </CardHeader>
          <CardBody className="pt-0 pb-7 px-8 font-normal">
            <p>
              Un outil pensé spécifiquement pour répondre aux besoins des
              étudiants et enseignants en BUT.
            </p>
          </CardBody>
        </Card>
        <Card className="max-w-[400px]  mx-auto ">
          <CardHeader className="flex gap-3 pb-5 pt-8 px-8">
            <p className="text-md font-semibold">
              Orienté pour les formations BUT.
            </p>
          </CardHeader>
          <CardBody className="pt-0 pb-7 px-8 font-normal">
            <p>
              Un outil pensé spécifiquement pour répondre aux besoins des
              étudiants et enseignants en BUT.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

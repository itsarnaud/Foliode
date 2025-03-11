import ModelViewer from "@/components/model/model-404/modelviewer";
import Image from "next/image";
import { Button, Link } from "@heroui/react";

export default function Error_404() {
  return (
    <div>
      <div className="flex justify-center mt-6">
        <Image
          src="/foliode-icon.svg"
          alt="logo foliode"
          width={75}
          height={75}
        />
      </div>
      <div className="flex items-center justify-center ">
        <ModelViewer />
        <div className="flex flex-col ">
          <h1 className="text-5xl font-bold">Oups !</h1> <br />
          <h2 className="text-3xl font-bold">
            404 - La page n'est pas trouvée{" "}
          </h2>
          <p className="mt-2">
            La page que vous recherchez a peut-être été supprimée ou est
            temporairement indisponible.
          </p>
          <div className="flex justify-left">
            <Button
              className="text-20   mt-4"
              as={Link}
              href="/"
              variant="solid"
              color="primary"
            >
              Revenir sur la page Foliode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
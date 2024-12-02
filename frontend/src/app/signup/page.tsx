 "use client";

import Buttons from "@/components/UI/button";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import GithubAuth from "@/components/GitHub/GithubAuth";
import DribbbleAuth from "@/components/Dribbble/DribbbleAuth";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const styles = {
    inputWrapper: [
      "border-primary",
      "data-[hover=true]:border-primary-100",
      "group-data-[focus=true]:border-primary"
    ],
    clearButton: "text-primary"
  }

  return (
    <div className="min-h-screen w-full nightMode bg-background text-white flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-md p-5 gap-5">

        <div className="flex flex-col items-center justify-center gap-5">
          {/* Logo */}
          <div className="w-20 h-20 bg-red-400"></div>
          <h1 className="text-lg font-bold">Inscrivez-vous sur Foliode !</h1>
        </div>

        <form action="" className="w-full flex flex-col gap-4 items-center md:items-start">
          <Input isRequired isClearable type="email" variant="bordered" label="Email" placeholder="john.doe@example.com" classNames={styles} />
          
          <div className="w-full flex flex-col md:flex-row gap-4">
            <Input isRequired type="text" variant="bordered" label="Prénom" placeholder="John" classNames={styles} />
            <Input isRequired type="text" variant="bordered" label="Nom" placeholder="Doe" classNames={styles} />
          </div>

            <Input
              isRequired
              label="Mot de passe"
              variant="bordered"
              placeholder="Votre mot de passe"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <FaEyeSlash className="text-2xl text-primary pointer-events-none" />
                  ) : (
                    <IoEyeSharp className="text-2xl text-primary pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              classNames={styles}
            />
            <Input
              isRequired
              label="Confirmer le mot de passe"
              variant="bordered"
              placeholder="Confirmer le mot de passe"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm}>
                  {isVisibleConfirm ? (
                    <FaEyeSlash className="text-2xl text-primary pointer-events-none" />
                  ) : (
                    <IoEyeSharp className="text-2xl text-primary pointer-events-none" />
                  )}
                </button>
              }
              type={isVisibleConfirm ? "text" : "password"}
              classNames={styles}
            />

          <Buttons text="S'inscrire" style="large-button" type="submit" />
          <span className="text-sm sm:text-base">Déjà un compte ? <Link href="/login" className="cursor-pointer text-[#3E3F92] hover:text-[#5b5dd8] hover:underline">Connectez-vous !</Link></span>
        </form>

        <div className="flex gap-5 items-center w-full">
          <hr className="border border-primary w-full" />
          <span className="text-sm">OU</span>
          <hr className="border border-primary w-full" />
        </div>

        <div className="flex flex-col gap-2 items-center w-full md:flex-row">
          <DribbbleAuth />
          <GithubAuth />
        </div>

      </div>
    </div>
  );
}
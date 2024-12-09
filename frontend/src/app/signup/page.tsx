"use client";

import Buttons from "@/components/UI/button";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import GithubAuth from "@/components/GitHub/GithubAuth";
import DribbbleAuth from "@/components/Dribbble/DribbbleAuth";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  
  const [data, setData] = useState({
    email: "",
    full_name: "",
    password: "",
    passwordConfirm: ""
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (data.password !== data.passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/signup`,
        { 
          "email": data.email,
          "password": data.password,
          "full_name": data.full_name
        },
        { headers: { "Content-Type": "application/json" }}
      );

      router.push("/login");
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError("Les données saisies sont invalides");
        } else {
          console.log(err)
          setError("Une erreur est survenue lors de l'inscription");
        }
      } else {
        setError("Erreur inattendue");
      }
    }
  };

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
          <img src="/foliode-icon.svg" className="w-20 h-20" alt="Logo Foliode" />
          <h1 className="text-lg font-bold">Inscrivez-vous sur Foliode !</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center md:items-start">
          <Input isRequired isClearable value={data.email} type="email" name="email" variant="bordered" label="Email" placeholder="john.doe@example.com" classNames={styles} onChange={handleInputChange} />
          <Input isRequired isClearable value={data.full_name} type="text" variant="bordered" name="full_name" label="Nom complet" placeholder="John DOE" classNames={styles} onChange={handleInputChange} />

            <Input
              isRequired
              label="Mot de passe"
              variant="bordered"
              placeholder="Votre mot de passe"
              name="password"
              value={data.password}
              onChange={handleInputChange}
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
              name="passwordConfirm"
              value={data.passwordConfirm}
              onChange={handleInputChange}
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
          {/* TODO: Bien faire les messages d'erreur : https://nextui.org/docs/components/input */}
          {error && <p className="text-red-500 text-sm">{error}</p>}        
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
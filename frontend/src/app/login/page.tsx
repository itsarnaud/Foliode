"use client";

import Buttons from "@/components/UI/button";
import GithubAuth from "@/components/GitHub/GithubAuth";
import DribbbleAuth from "@/components/Dribbble/DribbbleAuth";
import Link from "next/link";
import Image from "next/image";

import { Input } from "@heroui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiAuth } from "@/utils/apiRequester";
import { getCookie } from "@/utils/cookiesHelpers";

import { CircularProgress } from "@heroui/progress";
import PasswordInput from "@/components/UI/PasswordInput";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    const errorCookie = getCookie('error');

    if (errorCookie) {
      setError(decodeURIComponent(errorCookie));
      document.cookie = "error=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const response = await apiAuth("user/signin", data);

    if (response?.data.error) {
      setError(response.data.error);
      setData({ email: "", password: "" });
      setIsLoading(false);
      return;
    }

    if (response !== null && response.data.token) {
      document.cookie = `token_auth=${response.data.token}; path=/`;
      router.push("/dashboard");
    }
  };

  const styles = {
    inputWrapper: [
      "border-primary",
      "data-[hover=true]:border-primary-100",
      "group-data-[focus=true]:border-primary",
    ],
    input: ["text-white", "placeholder:text-gray-400", "focus:text-blue-500"],
    label: "text-white",
    clearButton: "text-primary",
  };

  return (
    <>
      <div className="min-h-screen w-full nightMode bg-background text-white flex items-center justify-center">
        <div className="flex flex-col items-center w-full max-w-md p-5 gap-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <Image
              src="/foliode-icon.svg"
              alt="Logo Foliode"
              width={50}
              height={50}
            />
            <h1 className="text-lg font-bold">Connectez vous sur Foliode !</h1>
          </div>

          <form
            onSubmit={validateForm}
            className="w-full flex flex-col gap-4 items-center md:items-start"
          >
            <Input
              isRequired
              isClearable
              name="email"
              type="email"
              value={data.email}
              onChange={handleInputChange}
              variant="bordered"
              label="Email"
              placeholder="john.doe@example.com"
              classNames={styles}
              onClear={() => setData({ ...data, email: "" })}
            />
            <PasswordInput
              label="Mot de passe"
              value={data.password}
              name="password"
              onChange={handleInputChange}
            />
            {error && <p className="text-[#F31260] text-sm">{error}</p>}
            <span className="text-sm sm:text-base">
              Mot de passe oublié ?{" "}
              <Link
                href="/"
                className="cursor-pointer text-[#3E3F92] hover:text-[#5b5dd8] hover:underline"
              >
                Cliquez ici !
              </Link>{" "}
            </span>
            <Buttons
              style="form"
              type="submit"
              isDisabled={isLoading}
              text={
                isLoading ? (
                  <CircularProgress aria-label="Loading..." size="sm" />
                ) : (
                  "Se connecter"
                )
              }
            />

            <span className="text-sm sm:text-base">
              Pas de compte ?{" "}
              <Link
                href="/signup"
                className="cursor-pointer text-[#3E3F92] hover:text-[#5b5dd8] hover:underline"
              >
                Créez votre compte !
              </Link>{" "}
            </span>
          </form>

          <div className="flex gap-5 items-center w-full">
            <hr className="border border-primary w-full" />
            <span className="text-sm">OU</span>
            <hr className="border border-primary w-full" />
          </div>

          <div className="flex flex-col gap-2 items-center w-full md:flex-row">
            <DribbbleAuth disable={isLoading} />
            <GithubAuth disable={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
}

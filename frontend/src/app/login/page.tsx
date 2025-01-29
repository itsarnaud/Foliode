"use client";

import Buttons      from "@/components/UI/button";
import GithubAuth   from "@/components/GitHub/GithubAuth";
import DribbbleAuth from "@/components/Dribbble/DribbbleAuth";
import Link         from "next/link";

import { Input }      from "@heroui/react";
import { useState }   from "react";
import { useRouter }  from "next/navigation";
import { apiAuth }    from "@/utils/apiRequester";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { CircularProgress } from "@heroui/progress";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const toggleVisibility = () => setIsVisible(!isVisible);

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
      setData({ email: "", password: "" })
      setIsLoading(false);
      return
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
            <img
              src="/foliode-icon.svg"
              className="w-20 h-20"
              alt="Logo Foliode"
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
              onClear={() => setData({...data, email: ''})}
            />
            <Input
              isRequired
              label="Mot de passe"
              variant="bordered"
              placeholder="Votre mot de passe"
              name="password"
              value={data.password}
              onChange={handleInputChange}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
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
            <Buttons style="form" type="submit" isDisabled={isLoading} text={isLoading ? <CircularProgress aria-label="Loading..." size="sm" /> : "Se connecter"} />

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
            <DribbbleAuth />
            <GithubAuth />
          </div>
        </div>
      </div>
    </>
  );
}

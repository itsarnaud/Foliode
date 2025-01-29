"use client";

import Buttons      from "@/components/UI/button";
import Link         from "next/link";
import GithubAuth   from "@/components/GitHub/GithubAuth";
import DribbbleAuth from "@/components/Dribbble/DribbbleAuth";

import { useState }   from "react";
import { useRouter }  from "next/navigation";
import { Input }      from "@heroui/react";
import { apiAuth }    from "@/utils/apiRequester";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { CircularProgress } from "@heroui/progress";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [data, setData] = useState({
    email: "",
    lastname: "",
    firstname: "",
    password: "",
    passwordConfirm: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (data.password !== data.passwordConfirm) {
      setError("Les mots de passes ne correspondent pas.")
      setIsLoading(false);
      return
    }

    const response = await apiAuth("user/signup", data);

    if (response?.data?.token) {
      document.cookie = `token_auth=${response.data.token}; path=/`;
      router.push("/portfolio/edit");
    }

    if (response?.data.error) {
      setError(response.data.error);
      setIsLoading(false);
      return
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
    <div className="min-h-screen w-full nightMode bg-background text-white flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-md p-5 gap-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <img
            src="/foliode-icon.svg"
            className="w-20 h-20"
            alt="Logo Foliode"
          />
          <h1 className="text-lg font-bold">Inscrivez-vous sur Foliode !</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 items-center md:items-start"
        >
          <Input
            isRequired
            isClearable
            value={data.email}
            type="email"
            name="email"
            variant="bordered"
            label="Email"
            placeholder="john.doe@example.com"
            classNames={styles}
            onChange={handleInputChange}
            onClear={() => setData({...data, email: ''})}
          />
          <Input
            isRequired
            isClearable
            value={data.firstname}
            type="text"
            variant="bordered"
            name="firstname"
            label="Prénom"
            placeholder="John"
            classNames={styles}
            onChange={handleInputChange}
            onClear={() => setData({...data, firstname: ''})}
          />
          <Input
            isRequired
            isClearable
            value={data.lastname}
            type="text"
            variant="bordered"
            name="lastname"
            label="Nom"
            placeholder="DOE"
            classNames={styles}
            onChange={handleInputChange}
            onClear={() => setData({...data, lastname: ''})}
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
          <Input
            isRequired
            label="Confirmer le mot de passe"
            variant="bordered"
            placeholder="Confirmer le mot de passe"
            name="passwordConfirm"
            value={data.passwordConfirm}
            onChange={handleInputChange}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityConfirm}
              >
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

          {typeof error === 'string' && <p className="text-[#F31260] text-sm">{error}</p>}

          {typeof error === 'object' && Object.keys(error).map((key) => (
            error[key] && <p key={key} className="text-[#F31260] text-sm">{error[key]}</p>
          ))}

          <Buttons style="form" type="submit" isDisabled={isLoading} text={isLoading ? <CircularProgress aria-label="Loading..." size="sm" /> : "S'inscrire"} />
          
          <span className="text-sm sm:text-base">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="cursor-pointer text-[#3E3F92] hover:text-[#5b5dd8] hover:underline"
            >
              Connectez-vous !
            </Link>
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
  );
}

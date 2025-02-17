"use client";

import DashboardTitle from "@/components/DashboardTitle";
import Buttons        from "@/components/UI/button";

import { Avatar }          from "@/components/Avatar";
import { signInGitHub }    from "@/actions";
import { signInDribbble }  from "@/actions";
import { Link, Input }     from "@heroui/react";
import { getDecodedToken } from "@/utils/jwtUtils";

import { useState, useEffect } from "react";
import { useUser }             from "@/utils/store";
import { apiPut }              from "@/utils/apiRequester";
import { Response }            from "@/interfaces/Response";

import { IoEyeSharp }                       from "react-icons/io5";
import { LuExternalLink }                   from "react-icons/lu";
import { FaEyeSlash, FaDribbble, FaGithub } from "react-icons/fa";
import { FaCircleCheck, FaCircleXmark }     from "react-icons/fa6";


export default function Profile() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    last_name: "",
    first_name: "",
    username: "",
    email: "",
    password: ""
  })

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = getDecodedToken();
    if (user === null && token !== null) {
      setUser(token);
    }
  }, [user]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res: Response = await apiPut('user', data);

    if (res.token) {
      document.cookie = `token_auth=${res.token}; path=/`;
      window.location.reload();
    }

    if (res.error) {
      setError(res.error)
    }
  }

  const styles = {
    inputWrapper: [
      "border-primary",
      "data-[hover=true]:border-primary-100",
      "group-data-[focus=true]:border-primary",
    ],
    clearButton: "text-primary",
  };

  return (
    <>
      {user !== null && (
        <>
          <DashboardTitle title="Profil" />
          <div className="flex flex-col w-full xl:flex-row gap-3">
            <section className="bg-[#f5f5f5] dark:bg-[#191919] text-foreground flex flex-col items-center p-5 rounded-xl xl:h-[calc(100vh-50px-1.75rem)]">
              <div className="mb-3">
                <Avatar size={70} />
              </div>
              <div className="flex items-center gap-1">
                <p className="text-sm">{user.lastname}</p>
                <p className="text-sm">{user.firstname}</p>
              </div>
              <p className="text-sm">Classe (s'il en a une)</p>

              <Link showAnchorIcon href={`/${user.username}`} className="!text-primary mt-3">
                Lien du portfolio
              </Link>
            </section>

            <section className="bg-[#f5f5f5] dark:bg-[#191919] text-foreground  flex flex-col items-center p-5 rounded-xl gap-3 xl:gap-5 xl:flex-1 xl:items-start xl:h-[calc(100vh-50px-1.75rem)]">
              <h3 className="font-bold text-large xl:text-2xl">Votre compte</h3>
              <div className="flex flex-col w-full gap-5 xl:flex-row xl:w-9/12 xl:gap-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full xl:gap-8 xl:w-9/12">
                  <Input
                    isRequired
                    isClearable
                    placeholder={user.lastname || "Votre nom"}
                    name="last_name"
                    type="text"
                    variant="bordered"
                    label="Nom"
                    classNames={styles}
                    onChange={onChangeValue}
                  />
                  <Input
                    isRequired
                    isClearable
                    placeholder={user.firstname || "Votre prénom"}
                    name="first_name"
                    type="text"
                    variant="bordered"
                    label="Prénom"
                    classNames={styles}
                    onChange={onChangeValue}
                  />
                  <Input
                    isRequired
                    isClearable
                    placeholder={user.username || "Votre nom d'utilisateur"}
                    name="username"
                    type="text"
                    variant="bordered"
                    label="Nom d'utilisateur"
                    classNames={styles}
                    onChange={onChangeValue}
                  />
                  <Input
                    isRequired
                    isClearable
                    placeholder={user.email || "Votre email"}
                    name="email"
                    type="email"
                    variant="bordered"
                    label="Email"
                    classNames={styles}
                    onChange={onChangeValue}
                  />
                  <Input
                    isRequired
                    label="Mot de passe"
                    variant="bordered"
                    placeholder="Votre mot de passe"
                    name="password"
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
                    onChange={onChangeValue}
                  />

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="w-full xl:w-3/12">
                    <Buttons text="Modifier" style="form" type="submit" />
                  </div>
                </form>

                <div className="w-0.5 h-full bg-primary hidden xl:block"></div>

                <div className="flex gap-5 items-center w-full my-2 xl:hidden">
                  <hr className="border border-primary w-full" />
                  <span className="text-sm text-center">LIER VOS COMPTES</span>
                  <hr className="border border-primary w-full" />
                </div>

                <div className="flex flex-col gap-2 items-center xl:w-6/12 xl:gap-5 ">
                  <div className="flex flex-col justify-between w-full items-center border border-primary gap-2 rounded-lg p-3 xl:gap-0 xl:flex-row bg-[#f5f5f5] dark:bg-[#191919] text-foreground">
                    <div className="flex flex-col items-center gap-3 xl:flex-row">
                      <FaGithub size={45} />
                      <div className="flex flex-col items-center xl:justify-between xl:items-start">
                        <span>Github</span>
                        {user.github_login ? (
                          <Link
                            isExternal
                            showAnchorIcon
                            href={`https://github.com/${user.github_login}`}
                            className="text-primary"
                          >
                            Votre profil
                          </Link>
                        ) : (
                          <form
                            action={signInGitHub}
                            className="flex w-full items-center hover:opacity-80 active:opacity-disabled transition-opacity cursor-pointer"
                          >
                            <input
                              type="submit"
                              value="Associer"
                              className="text-medium cursor-pointer"
                            />
                            <LuExternalLink className="mx-1" />
                          </form>
                        )}
                      </div>
                    </div>
                    <div
                      className={`flex gap-2 items-center ${
                        user.github_login
                          ? "bg-green-500 border-green-700"
                          : "bg-red-500 border-red-700"
                      } border rounded-full px-3 w-max h-max`}
                    >
                      {user.github_login ? <FaCircleCheck /> : <FaCircleXmark />}
                      {user.github_login ? "Associé" : "Non Associé"}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between w-full items-center border border-primary gap-2 rounded-lg p-3 xl:gap-0 xl:flex-row bg-[#f5f5f5] dark:bg-[#191919] text-foreground">
                    <div className="flex flex-col items-center gap-3 xl:flex-row">
                      <FaDribbble size={45} />
                      <div className="flex flex-col items-center xl:justify-between xl:items-start">
                        <span>Dribbble</span>
                        {user.dribbble_login ? (
                          <Link
                            isExternal
                            showAnchorIcon
                            href={`https://dribbble.com/${user.dribbble_login}`}
                            className="text-primary"
                          >
                            Votre profil
                          </Link>
                        ) : (
                          <form
                            action={signInDribbble}
                            className="flex w-full items-center hover:opacity-80 active:opacity-disabled transition-opacity cursor-pointer"
                          >
                            <input
                              type="submit"
                              value="Associer"
                              className="text-medium cursor-pointer"
                            />
                            <LuExternalLink className="mx-1" />
                          </form>
                        )}
                      </div>
                    </div>
                    <div
                      className={`flex gap-2 items-center ${
                        user.dribbble_login
                          ? "bg-green-500 border-green-700"
                          : "bg-red-500 border-red-700"
                      } border rounded-full px-3 w-max h-max`}
                    >
                      {user.dribbble_login ? <FaCircleCheck /> : <FaCircleXmark />}
                      {user.dribbble_login ? "Associé" : "Non Associé"}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
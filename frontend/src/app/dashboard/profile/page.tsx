"use client";

import DashboardTitle  from "@/components/DashboardTitle"
import Avatar          from "@/components/Avatar"
import GithubAuth      from "@/components/GitHub/GithubAuth"
import DribbbleAuth    from "@/components/Dribbble/DribbbleAuth"
import Buttons         from "@/components/UI/button";

import { Link, Input } from "@nextui-org/react";
import { useState }    from "react";
import { IoEyeSharp }  from "react-icons/io5";
import { FaEyeSlash, FaDribbble, FaGithub } from "react-icons/fa";



export default function Profile() {

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const styles = {
		inputWrapper: [ 
			"border-primary", 
			"data-[hover=true]:border-primary-100", 
			"group-data-[focus=true]:border-primary" 
		], 
		clearButton: "text-primary"
	}

  return (
    <>
      <DashboardTitle title="Profile" email="john.doe@example.com" />

      <div className="flex flex-col w-full lg:flex-row gap-3">
        <section className="bg-foreground text-white nightMode flex flex-col items-center p-5 rounded-xl lg:h-[calc(100vh-50px-1.75rem)]">
          <div className="mb-3">
            <Avatar email="john.doe@example.com" size={150} />
          </div>
          <p className="text-sm">Prénom NOM</p>
          <p className="text-sm">Classe (s'il en a une)</p>

          <Link isExternal showAnchorIcon href="#" className="!text-primary mt-3">Lien du portfolio</Link>
        </section>

        <section className="bg-foreground text-white nightMode flex flex-col items-center p-5 rounded-xl gap-3 lg:gap-5 lg:flex-1 lg:items-start lg:h-[calc(100vh-50px-1.75rem)]">
          <h3 className="font-bold text-large lg:text-2xl">Votre compte</h3>
          <div className="flex flex-col w-full gap-5 lg:flex-row lg:w-9/12 lg:gap-10">
            <form action="" className="flex flex-col gap-3 w-full lg:gap-8 lg:w-9/12">
              <Input isRequired isClearable name="nom" type="text" variant="bordered" label="Nom" placeholder="Votre nom" classNames={styles} />
              <Input isRequired isClearable name="prenom" type="text" variant="bordered" label="Prénom" placeholder="Votre prénom" classNames={styles} />
              <Input isRequired isClearable name="email" type="email" variant="bordered" label="Email" placeholder="Votre Email" classNames={styles} />
              <Input
                isRequired
                label="Mot de passe"
                variant="bordered"
                placeholder="Votre mot de passe"
                name="password"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
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
              <div className="w-full lg:w-3/12">
                <Buttons text="Modifier" style="large-button" type="submit" />
              </div>

            </form>

            <div className="w-0.5 h-full bg-primary hidden lg:block"></div>

            <div className="flex gap-5 items-center w-full my-2 lg:hidden">
              <hr className="border border-primary w-full" />
              <span className="text-sm text-center">LIER VOS COMPTES</span>
              <hr className="border border-primary w-full" />
            </div>


            <div className="flex flex-col gap-2 items-center lg:w-3/12 lg:gap-5 ">
              <DribbbleAuth />
              <GithubAuth />
						</div>



            
          </div>
        </section>
        
      </div>
    </>
  )
}
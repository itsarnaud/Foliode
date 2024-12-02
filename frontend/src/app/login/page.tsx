"use client";

import Buttons from "@/components/UI/button";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash, FaDribbble, FaGithub } from "react-icons/fa";
import Link from "next/link";

import GithubAuth 	from "@/components/GitHub/GithubAuth"
import DribbbleAuth from "@/components/Dribbble/DribbbleAuth"



export default function LoginPage() {

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

					<div className="min-h-screen w-full nightMode bg-background text-white flex items-center justify-center">
						<div className="flex flex-col items-center w-full max-w-md p-5 gap-5">

							<div className="flex flex-col items-center justify-center gap-5">
								{/* Logo */}
								<div className="w-20 h-20 bg-red-400"></div>
								<h1 className="text-lg font-bold">Connectez vous sur Foliode !</h1>
							</div>

							<form action="" className="w-full flex flex-col gap-4 items-center md:items-start">
								<Input isRequired isClearable type="email" variant="bordered" label="Email" placeholder="john.doe@example.com" classNames={styles} />
								<Input
									isRequired
									label="Mot de passe"
									variant="bordered"
									placeholder="Votre mot de passe"
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
								<span className="text-sm sm:text-base">Mot de passe oublié ? <Link href="/" className="cursor-pointer text-[#3E3F92] hover:text-[#5b5dd8] hover:underline">Cliquez ici !</Link> </span>
								<Buttons text="Se connecter" style="large-button" type="submit" />
								<span className="text-sm sm:text-base">Pas de compte ? <Link href="/signup" className="cursor-pointer text-[#3E3F92] hover:text-[#5b5dd8] hover:underline">Créez votre compte !</Link> </span>
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
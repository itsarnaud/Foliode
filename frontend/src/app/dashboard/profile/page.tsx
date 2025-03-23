"use client";

import DashboardTitle from "@/components/DashboardTitle";
import Buttons from "@/components/UI/button";

import { AvatarInput } from "@/components/AvatarInput";
import {signInGitHub} from "@/actions";
import {signInDribbble} from "@/actions";
import {Link} from "@heroui/react";

import {useEffect} from "react";
import {useUserStore} from "@/store/user.store";

import {LuExternalLink} from "react-icons/lu";
import {FaDribbble, FaGithub} from "react-icons/fa";
import {FaCircleCheck, FaCircleXmark} from "react-icons/fa6";
import BlueInput from "@/components/UI/BlueInput";


export default function Profile() {
    const {user, setUser, fetchFromJwt, updateUser} = useUserStore();

    useEffect(() => {
        fetchFromJwt()
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateUser()
    }


    return (
        <>
            {user !== null && (
                <>
                    <DashboardTitle title="Profil"/>
                    <div className="flex flex-col w-full xl:flex-row gap-3">
                        <section
                            className="bg-[#f5f5f5] dark:bg-[#191919] text-foreground flex flex-col items-center p-5 rounded-xl xl:h-[calc(100vh-50px-1.75rem)]">
                            <div className="mb-3">
                                < AvatarInput size={150}/>
                            </div>
                            <div className="flex items-center gap-1">
                                <p className="text-sm">{user.lastname}</p>
                                <p className="text-sm">{user.firstname}</p>
                            </div>

                        </section>

                        <section
                            className="bg-[#f5f5f5] dark:bg-[#191919] text-foreground  flex flex-col items-center p-5 rounded-xl gap-3 xl:gap-5 xl:flex-1 xl:items-start xl:h-[calc(100vh-50px-1.75rem)]">
                            <h3 className="font-bold text-large xl:text-2xl">Votre compte</h3>
                            <div className="flex flex-col w-full gap-5 xl:flex-row xl:w-9/12 xl:gap-10">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full xl:gap-8 xl:w-9/12">
                                    <BlueInput value={user.lastname} label="nom" placeholder="Votre Nom"
                                               onChange={value => setUser({...user, lastname: value.target.value})}/>
                                    <BlueInput value={user.firstname} label="prénom" placeholder="Votre prénom"
                                               onChange={value => setUser({...user, firstname: value.target.value})}/>
                                    <BlueInput value={user.email} label="Email" placeholder="Votre email"
                                               onChange={value => setUser({...user, email: value.target.value})}/>

                                    <div className="w-full xl:w-3/12">
                                        <Buttons text="Modifier" style="form" type="submit"/>
                                    </div>
                                </form>

                                <div className="w-0.5 h-full bg-primary hidden xl:block"></div>

                                <div className="flex gap-5 items-center w-full my-2 xl:hidden">
                                    <hr className="border border-primary w-full"/>
                                    <span className="text-sm text-center">LIER VOS COMPTES</span>
                                    <hr className="border border-primary w-full"/>
                                </div>

                                <div className="flex flex-col gap-2 items-center xl:w-6/12 xl:gap-5 ">
                                    <div
                                        className="flex flex-col justify-between w-full items-center border border-primary gap-2 rounded-lg p-3 xl:gap-0 xl:flex-row bg-[#f5f5f5] dark:bg-[#191919] text-foreground">
                                        <div className="flex flex-col items-center gap-3 xl:flex-row">
                                            <FaGithub size={45}/>
                                            <div
                                                className="flex flex-col items-center xl:justify-between xl:items-start">
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
                                                        <LuExternalLink className="mx-1"/>
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
                                            {user.github_login ? <FaCircleCheck/> : <FaCircleXmark/>}
                                            {user.github_login ? "Associé" : "Non Associé"}
                                        </div>
                                    </div>

                                    <div
                                        className="flex flex-col justify-between w-full items-center border border-primary gap-2 rounded-lg p-3 xl:gap-0 xl:flex-row bg-[#f5f5f5] dark:bg-[#191919] text-foreground">
                                        <div className="flex flex-col items-center gap-3 xl:flex-row">
                                            <FaDribbble size={45}/>
                                            <div
                                                className="flex flex-col items-center xl:justify-between xl:items-start">
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
                                                        <LuExternalLink className="mx-1"/>
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
                                            {user.dribbble_login ? <FaCircleCheck/> : <FaCircleXmark/>}
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
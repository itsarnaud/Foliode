import Buttons from "@/components/UI/button";
import Input from "@/components/UI/input"
export default function LoginPage() {
    return (
        <div className="min-h-screen w-full nightMode bg-background text-white flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-md">
                <form className="flex flex-col w-full sm:w-[411px] min-h-[478px] flex-shrink-0 gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-8 ">Connectez vous à Foliode !</h1>
                    <h4 className="text-sm sm:text-base mb-1">Email</h4>
                    <Input style="email" type="email" placeholder="prenom.nom@gmail.com"/>
                    <h4 className="text-sm sm:text-base mb-1 mt-3">Mot de passe</h4>
                    <Input style="mdp" type="password" placeholder="mot de passe" />
                    <p className="text-sm sm:text-base">Mot de passe oublié ? <a className="cursor-pointer text-[#3E3F92] hover:text-[#5b5dd8] hover:text-decoration-line: underline;">cliquez ici</a></p>
                    <Buttons text="Se connecter" style="large-button" />
                    <p className="text-sm sm:text-base">Pas de compte ? <a className="cursor-pointer  text-[#3E3F92] hover:text-[#5b5dd8] hover:text-decoration-line: underline;">Créé votre compte !</a></p>
                    <div className="flex items-center justify-center text-white">
                        <hr className="border-white border w-full" />
                        <span className="px-2 uppercase">ou</span>
                        <hr className="border-white border w-full" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Buttons text="Dribble" style="form" icon="dribble-icon"/>
                        <Buttons text="Github" style="form" icon="github-icon"/>
                    </div>
                </form>
            </div>
        </div>

        
    );
}
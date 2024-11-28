import Button from "@/components/UI/button";

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full nightMode bg-background text-white flex items-center justify-center px-4">
            <div className="flex flex-col items-center w-full max-w-md p-4 sm:p-8">
                <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-8 text-center">Connectez vous à Foliode !</h1>
                <form className="flex flex-col w-full sm:w-[411px] min-h-[478px] flex-shrink-0 gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button text="Dribble" style="form" icon="dribble-icon"/>
                        <Button text="Github" style="form" icon="github-icon"/>
                    </div>
                    <h4 className="text-sm sm:text-base">Email</h4>
                    <input type="" placeholder="prenom.nom@gmail.com" className="w-full" />
                    <h4 className="text-sm sm:text-base">Mot de passe</h4>
                    <input type="" placeholder="mot de passe" className="w-full" />    
                    <p className="text-sm sm:text-base">Mot de passe oublié ? <a className="cursor-pointer">cliquez ici</a></p>
                    <Button text="Se connecter" style="large-button" />
                    <p className="text-sm sm:text-base">Pas de compte ? <a className="cursor-pointer">Créé votre compte !</a></p>
                </form>
            </div>
        </div>
    );
}
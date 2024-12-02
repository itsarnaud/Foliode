import Input from "@/components/UI/input";
import Button from "@/components/UI/button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full nightMode bg-background text-white flex items-center justify-center">
    <div className="flex flex-col items-center w-full max-w-md">
        <form className="flex flex-col w-full sm:w-[411px] min-h-[478px] flex-shrink-0 gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-8 ">Inscrivez vous à Foliode !</h1>
            <label className="text-sm sm:text-base mb-1">Email</label>
            <Input style="email" type="email" placeholder="prenom.nom@gmail.com"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <label className="text-sm sm:text-base mb-1">Prénom</label>
              <Input style="form-small" type="" placeholder="Foliode"/>
              </div>
              <div className="flex flex-col">
                <label className="text-sm sm:text-base mb-1">Nom</label>
                <Input style="form-small" type="" placeholder="Team"/>
                </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-2">
            <div className="flex flex-col">
              <label className="text-sm sm:text-base mb-1">Mot de passe</label>
              <Input style="form-small-password" type="password" placeholder="Mot de passe"/>
              </div>
              <div className="flex flex-col">
                <label className="text-sm sm:text-base mb-1 text-[#0C0C0C]">_____</label>
                <Input style="form-small-password" type="password" placeholder="Confimer le mot de passe"/>
                </div>
                </div>
            <Button text="Se connecter" style="large-button" />
            <p className="text-sm sm:text-base">Déjà un compte ? <a className="cursor-pointer  text-[#3E3F92] hover:text-[#5b5dd8] hover:text-decoration-line: underline;">Se connecter !</a></p>
            <div className="flex items-center justify-center text-white">
                <hr className="border-white border w-full" />
                <span className="px-2 uppercase">ou</span>
                <hr className="border-white border w-full" />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button text="Dribble" style="form" icon="dribble-icon"/>
                <Button text="Github" style="form" icon="github-icon"/>
            </div>
        </form>
    </div>
</div>
  );
};
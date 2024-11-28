interface inputProps {
    style: string;
    type: string;
    placeholder: string;
    className?: string;
}

const Input: React.FC<inputProps> = ({type, style, placeholder, className}) => {
    switch(style){
        case("email"):
            return (
                <input type="" placeholder="prenom.nom@gmail.com" className="w-full flex items-center px-3.5 py-2.5 gap-2 rounded-lg border border-[#252525] bg-[#191919] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]" />
            );
        case("mdp"):
            return ( <input type="password" placeholder="mot de passe" className="w-full flex items-center px-3.5 py-2.5 gap-2 rounded-lg border border-[#252525] bg-[#191919] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]" />    
            );
        case("form-small-mdp"):
            return ( <input type="password" placeholder="" className="flex w-[199px] p-[10px] justify-center items-center gap-[12px] rounded-[8px] border-[1px] border-[#252525] bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />    
            );
        case("form-small"):
        return ( <input type="" placeholder="" className="flex w-[199px] p-[10px] justify-center items-center gap-[12px] rounded-[8px] border-[1px] border-[#252525] bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />)
        default:
            return null;
    }
}

export default Input;
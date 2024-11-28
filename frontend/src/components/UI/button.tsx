interface buttonProps {
    text: string;
    style: string;
    icon?: React.ReactNode;
    className?: string;
}

const Button: React.FC<buttonProps> = ({text, style, icon, className}) => {
    switch(style){
        case("form"):
            return (
                <button className="flex w-[199px] p-[10px] justify-center items-center gap-[12px] rounded-[8px] border-[1px] border-[#262626] bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                    {icon && <span>{icon}</span>}
                    {text}
                </button>
            );
        case("large-button"):
            return (<button className="flex w-[411px] items-start rounded-[8px] text-white font-inter text-base font-semibold leading-6 border-[#3E3F92] bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">

                {text}
            </button>);
        default:
            return null;
    }
}

export default Button;
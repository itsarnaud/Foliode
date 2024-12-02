import {Button, ButtonGroup} from "@nextui-org/react";


interface buttonProps {
    text: string;
    style: string;
    icon?: React.ReactNode;
    className?: string;
}

const Buttons: React.FC<buttonProps> = ({text, style, icon, className}) => {
    switch(style){
        case("form"):
            return (
                <div>
                  
                    <Button  className="flex w-[199px] p-[10px] justify-center items-center gap-[12px] rounded-[8px] border-[1px] border-[#262626] bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] text-white" >
                    {icon && <span>{icon}</span>}
                    {text}                    
                    </Button>
                </div>
            );
        case("large-button"):
            return (
            <Button className="flex w-[411px] items-center justify-center rounded-[8px] text-white font-inter text-base font-semibold leading-6 border-[#3E3F92] border-1 bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
            <p className="p-2">{text}</p> 
            </Button>
            );
        default:
            return null;
    }
}

export default Buttons;
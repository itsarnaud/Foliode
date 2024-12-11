import { Button } from "@nextui-org/react";
import Link from "next/link";

interface ButtonProps {
    text: string;
    style: string;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    type?: "button" | "submit" | "reset";
    isDisabled?: boolean;
}

const Buttons: React.FC<ButtonProps> = ({
    text,
    style,
    icon,
    className,
    onClick,
    href,
    type = "button",
    isDisabled = false
}) => {
    const ButtonContent = (
        <Button
            type={type}
            onClick={onClick}
            isDisabled={isDisabled}
            className={
                style === "form" 
                    ? `flex w-full p-[10px] justify-center items-center gap-[12px] rounded-[8px] border-[1px] text-base border-[#3E3F92] bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] text-white ${className}`
                    : `flex w-full items-center justify-center rounded-[8px] text-white font-inter text-base leading-6 border-[#3E3F92] border-1 bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ${className}`
            }
        >
            {icon && <span>{icon}</span>}
            {text}
        </Button>
    );

    if (href) {
        return <Link href={href}>{ButtonContent}</Link>;
    }

    return ButtonContent;
};

export default Buttons;
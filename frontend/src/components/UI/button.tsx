import { Button } from "@nextui-org/react";
import Link from "next/link";

interface ButtonProps {
    text: string;
    style: "form" | "card" | "default"; 
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    type?: "button" | "submit" | "reset";
    isDisabled?: boolean;
    subDescription?: string;
}

const Buttons: React.FC<ButtonProps> = ({
    text,
    style,
    icon,
    className,
    onClick,
    href,
    type = "button",
    isDisabled = false,
    subDescription
}) => {
    const ButtonContent = (
        <div className="flex flex-col items-center">
            <Button
                type={type}
                onPress={onClick}
                isDisabled={isDisabled}
                className={
                    style === "form" 
                        ? `flex w-full p-[10px] justify-center items-center gap-[12px] rounded-[8px] border-[1px] text-base border-[#3E3F92] bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] text-white ${className}`
                        : style === "card"
                        ? `flex w-[116px] h-[37px] p-[10px] justify-center items-center gap-[10px] rounded-[30px] border border-[#5F6E6B] bg-[#191919] text-white ${className}`
                        : `flex w-full items-center justify-center rounded-[8px] text-white font-inter text-base font-semibold leading-6 border-[#3E3F92] border-1 bg-[#191919] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ${className}`
                }
            >
                {icon && <span>{icon}</span>}
                {text}
            </Button>
            {subDescription && (
                <p className="text-white font-archivo text-base font-medium leading-normal mt-2">
                    {subDescription}
                </p>
            )}
        </div>
    );

    if (href) {
        return <Link href={href}>{ButtonContent}</Link>;
    }

    return ButtonContent;
};

export default Buttons;
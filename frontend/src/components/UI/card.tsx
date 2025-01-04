import { Card, CardBody } from "@nextui-org/react";
import Buttons from "../../components/UI/button";
import { FaCircleCheck, FaCircleXmark, FaGithub, FaDribbble } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
import { signInGitHub, signInDribbble } from "@/actions";
import Link from "next/link";
import { useUser } from "@/utils/store";

export type CardVariant = 'gradient' | 'default';

interface CardProps {
    variant: CardVariant;
    title: string;
    description: string;
    className?: string;
    onClick?: () => void;
    iconComponent?: React.ReactNode;
    imageUrl?: string;
    isLargeDescription?: boolean;
    buttonText?: string;
    subDescription?: string;
    status?: boolean;
}

const CustomCard: React.FC<CardProps> = ({
    variant = 'default',
    title,
    description,
    className,
    onClick,
    iconComponent,
    isLargeDescription,
    buttonText,
    subDescription,
    status,
}) => {
    const { user } = useUser();

    const getBackgroundClass = () => {
        if (variant === 'gradient') {
            return 'bg-gradient-to-tr from-[#1D1A21] to-[#5F65A9]';
        }
        return 'bg-[#f5f5f5] dark:bg-[#191919]';
    };

    const getFormAction = () => {
        if (buttonText === "Lier") {
            if (title.includes("GitHub")) {
                return signInGitHub;
            } else if (title.includes("Dribbble")) {
                return signInDribbble;
            }
        }
        return null;
    };

    const getProfileLink = () => {
        if (title.includes("GitHub") && user?.github_login) {
            return `https://github.com/${user.github_login}`;
        } else if (title.includes("Dribbble") && user?.dribbble_login) {
            return `https://dribbble.com/${user.dribbble_login}`;
        }
        return null;
    };

    return (
        <Card
            className={`w-full min-h-[245px] ${getBackgroundClass()} ${className}`}
            onClick={onClick}
            style={{
                flexShrink: 0,
                borderRadius: "13px",
                border: "none",
                position: "relative",
            }}
        >
            <CardBody className="flex flex-col items-start gap-4 p-0">
                {iconComponent && (
                    <div className={`absolute top-5 left-5 w-[60px] h-[60px] rounded-full flex items-center justify-center z-10
                        ${variant === 'gradient' ? 'bg-[#0C0C0C]' : 'bg-background'}`}>
                        <div className={`w-[40px] h-[40px] flex items-center justify-center
                            ${variant === 'gradient' ? 'text-white' : 'text-foreground'}`}>
                            {iconComponent}
                        </div>
                    </div>
                )}
                <div className="mt-24 w-full px-4">
                    <h3 className={`font-archivo text-base font-medium leading-normal
                        ${variant === 'gradient' ? 'text-white' : 'text'}`}>
                        {title}
                    </h3>
                    <p className={`font-archivo font-medium leading-normal
                        ${isLargeDescription ? 'text-[45px]' : 'text-[20px]'}
                        ${variant === 'gradient' ? 'text-white' : 'text'}`}>
                        {description}
                    </p>
                    {status !== undefined && (
                        <div className={`flex gap-2 items-center ${status ? 'bg-green-500 border-green-700' : 'bg-red-500 border-red-700'} border rounded-full px-3 w-max h-max`}>
                            {status ? <FaCircleCheck /> : <FaCircleXmark />}
                            {status ? 'Associé' : 'Non Associé'}
                        </div>
                    )}
                    {buttonText && buttonText === "Lier" ? (
                        getProfileLink() ? (
                            <div className="flex flex-col items-center xl:justify-between xl:items-start">
                                {getProfileLink() && (
                                    <a href={getProfileLink() as string} target="_blank" rel="noopener noreferrer" className="text-white flex items-center gap-1">
                                        Votre profil
                                        <LuExternalLink />
                                    </a>
                                )}
                            </div>
                        ) : (
                            <form action={getFormAction() ?? (() => {})} className="flex w-full items-center hover:opacity-80 active:opacity-disabled transition-opacity cursor-pointer">
                                <input type="submit" value="Associer" className="text-medium cursor-pointer" />
                                <LuExternalLink className="mx-1" />
                            </form>
                        )
                    ) : (
                        buttonText && (
                            <div className="mt-4 mb-4 flex justify-start">
                                <Buttons
                                    text={buttonText}
                                    style="card"
                                    className=""
                                />
                            </div>
                        )
                    )}
                    {subDescription && (
                        <p className="font-archivo text-base font-medium leading-normal">
                            {subDescription}
                        </p>
                    )}
                   
                  
                </div>
            </CardBody>
        </Card>
    );
};

interface LargeCardProps {
    variant?: 'default' | 'gradient';
    description?: string;
    className?: string;
    onClick?: () => void;
    iconComponent?: React.ReactNode;
    imageUrl?: string;
    isLargeDescription?: boolean;
    buttonText?: string;
    subDescription?: string;
    descriptionClassName?: string;
    status?: boolean;
}

const LargeCard: React.FC<LargeCardProps> = ({
    variant = 'default',
    description,
    className,
    descriptionClassName,
    onClick,
    status,
}) => {
    const getBackgroundClass = () => {
        if (variant === 'gradient') {
            return 'bg-gradient-to-tr from-[#1D1A21] to-[#5F65A9]';
        }
        return 'bg-[#f5f5f5] dark:bg-[#191919]';
    };

    return (
        <Card
            className={`${getBackgroundClass()} ${className}`}
            style={{
                flexShrink: 0,
                borderRadius: "13px",
                border: "none",
                position: "relative",
            }}
            onClick={onClick}
        >
            <CardBody>
                {description && (
                    <div className={`absolute top-0 left-0 ${descriptionClassName}`}>
                        {description}
                    </div>
                )}
                {status !== undefined && (
                    <div className={`flex gap-2 items-center ${status ? 'bg-green-500 border-green-700' : 'bg-red-500 border-red-700'} border rounded-full px-3 w-max h-max`}>
                        {status ? <FaCircleCheck /> : <FaCircleXmark />}
                        {status ? 'Associé' : 'Non Associé'}
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

interface GrandeCardProps {
    variant?: 'default' | 'gradient';
    title: string;
    description?: string;
    className?: string;
    onClick?: () => void;
    iconComponent?: React.ReactNode;
    imageUrl?: string;
    status?: boolean;
}

const GrandeCard: React.FC<GrandeCardProps> = ({
    variant = 'default',
    title,
    description,
    className,
    onClick,
    status,
}) => {
    const getBackgroundClass = () => {
        if (variant === 'gradient') {
            return 'bg-gradient-to-tr from-[#1D1A21] to-[#5F65A9]';
        }
        return 'bg-[#f5f5f5] dark:bg-[#191919]';
    };

    return (
        <Card
            className={`w-full h-[468px] ${getBackgroundClass()} ${className}`}
            onClick={onClick}
            style={{
                flexShrink: 0,
                borderRadius: "13px",
                border: "none",
                position: "relative",
            }}
        >
            <CardBody className="flex flex-col">
                <div className="flex flex-col gap-2 mb-6">
                    <h2 className={`font-archivo text-lg leading-normal pl-2 pt-2
                        ${variant === 'gradient' ? 'text-white' : 'text-foreground'}`}>
                        {title}
                    </h2>
                    {description && (
                        <p className={`font-archivo text-lg leading-normal pl-2
                        ${variant === 'gradient' ? 'text-white' : 'text-foreground'}`}>
                            {description}
                        </p>
                    )}
                    {status !== undefined && (
                        <div className={`flex gap-2 items-center ${status ? 'bg-green-500 border-green-700' : 'bg-red-500 border-red-700'} border rounded-full px-3 w-max h-max`}>
                            {status ? <FaCircleCheck /> : <FaCircleXmark />}
                            {status ? 'Associé' : 'Non Associé'}
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default CustomCard;
export { LargeCard, GrandeCard };
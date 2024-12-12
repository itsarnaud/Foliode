// card.tsx
import {Card, CardBody} from "@nextui-org/react";
import Buttons from "../../components/UI/button";

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
}) => {
    const getBackgroundClass = () => {
        if (variant === 'gradient') {
            return 'bg-gradient-to-tr from-[#1D1A21] to-[#5F65A9]';
        }
        return 'bg-[#f5f5f5] dark:bg-[#191919]';
    };

    return (
        <Card 
            className={`w-full sm:w-[236px] min-h-[245px] ${getBackgroundClass()} ${className}`}
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
                        ${variant === 'gradient' ? 'text-white' : 'text-foreground'}`}>
                        {title}
                    </h3>
                    <p className={`font-archivo font-medium leading-normal
                        ${isLargeDescription ? 'text-[45px]' : 'text-[20px]'}
                        ${variant === 'gradient' ? 'text-white' : 'text-foreground'}`}>
                        {description}
                    </p>
                    {buttonText && (
                        <div className="mt-4 mb-4">
                            <Buttons 
                                text={buttonText}
                                style="card"
                            />
                        </div>
                    )}
                    {subDescription && (
                        <p className="text-white font-archivo text-base font-medium leading-normal">
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
    title: string;
    description?: string;
    className?: string;
    onClick?: () => void;
    iconComponent?: React.ReactNode;
    imageUrl?: string;
    isLargeDescription?: boolean;
    buttonText?: string;
    subDescription?: string;
}

const LargeCard: React.FC<LargeCardProps> = ({
    variant = 'default',
    title,
    className,
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
        >
            <CardBody>

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
}

const GrandeCard: React.FC<GrandeCardProps> = ({
    variant = 'default',
    title,
    description,
    className,
    onClick,

}) => {
    const getBackgroundClass = () => {
        if (variant === 'gradient') {
            return 'bg-gradient-to-tr from-[#1D1A21] to-[#5F65A9]';
        }
        return 'bg-[#f5f5f5] dark:bg-[#191919]';
    };

    return (
        <Card 
            className={`w-full max-w-[1494px] h-[468px] ${getBackgroundClass()} ${className}`}
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
            </div>
            </CardBody>
            </Card>

            );
};

export default CustomCard; LargeCard; GrandeCard ;
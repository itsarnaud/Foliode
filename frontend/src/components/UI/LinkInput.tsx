import React, { useState } from 'react';

interface LinkInputProps {
    placeholder: string;
    name: string;
    onChange: (value: string[]) => void;
}

const LinkInput: React.FC<LinkInputProps> = ({ placeholder, name, onChange }) => {
    const [links, setLinks] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

    const handleInputChange = (value: string) => {
        const trimmedValue = value.trim();
        const urlRegex = /^(https?:\/\/)([\w.-]+)(\.[a-z]{2,})(\/[\w./-]*)?$/i;
        const isLink = urlRegex.test(trimmedValue);

        setInputValue(value);

        if (isLink) {
            setLinks([...links, trimmedValue]);
            setInputValue('');
            onChange([...links, trimmedValue]);
        }
    };

    const handleRemoveLink = (linkToRemove: string) => {
        const updatedLinks = links.filter((link) => link !== linkToRemove);
        setLinks(updatedLinks);
        onChange(updatedLinks);
    };

    const displayLink = (link: string) => {
        return link.replace(/^(https?:\/\/)/, '');
    };

    return (
        <div
            className={`px-2 py-1 border-2 border-gray-500 hover:border-gray-300 rounded-md ${
                isInputFocus ? 'border-primary' : ''
            } bg-transparent transition-all duration-300 ease-in-out w-full flex items-center`}
        >
            {links.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-primary-200 text-primary-900 px-3 py-1 rounded-full text-sm"
                        >
                            {displayLink(link)}
                            <button
                                onClick={() => handleRemoveLink(link)}
                                className="ml-2 text-red-500 hover:text-red-700"
                                aria-label={`Remove ${link}`}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <input
                type="text"
                name={name}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setIsInputFocus(true)}
                onBlur={() => setIsInputFocus(false)}
                className="focus:outline-none border-0 bg-transparent text-gray-400 placeholder-gray-400 w-full"
                placeholder={links.length === 0 ? placeholder : ''}
                value={inputValue}
            />
        </div>
    );
};

export default LinkInput;

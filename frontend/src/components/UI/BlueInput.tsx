import React from 'react';
import {Input} from "@heroui/react";

interface BlueInputProps {
    value: string;
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BlueInput({value, label, placeholder, onChange}: BlueInputProps) {

    const styles = {
        inputWrapper: [
            "border-primary",
            "data-[hover=true]:border-primary-100",
            "group-data-[focus=true]:border-primary",
        ],
        clearButton: "text-primary",
    };

    return (
        <Input
            isRequired
            isClearable
            placeholder={placeholder}
            value={value}
            name=""
            type="text"
            variant="bordered"
            label={label}
            classNames={styles}
            onChange={(value) => onChange(value)}
        />
    );
}

export default BlueInput;
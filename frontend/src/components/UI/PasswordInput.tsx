import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Input } from "@heroui/react";

interface PasswordInputProps {
  onChange: (password: string) => void;
  value: string;
  label: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  onChange,
  value,
  label,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const styles = {
    inputWrapper: [
      "border-primary",
      "data-[hover=true]:border-primary-100",
      "group-data-[focus=true]:border-primary",
    ],
    input: ["text-white", "placeholder:text-gray-400", "focus:text-blue-500"],
    label: "text-white",
    clearButton: "text-primary",
  };

  return (
    <Input
      isRequired
      label={label}
      variant="bordered"
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <FaEyeSlash className="text-2xl text-primary pointer-events-none" />
          ) : (
            <IoEyeSharp className="text-2xl text-primary pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      classNames={styles}
    />
  );
};

export default PasswordInput;

"use client";

import { Input } from "@heroui/react";
import React from "react";

interface URLInputProps {
  onChange: (url: string) => void;
  value: string;
}

export const URLInput: React.FC<URLInputProps> = ({ onChange, value }) => {
  return (
    <div className="relative flex items-center">
      <Input
        classNames={{
          base: "max-w-full",
          input: "pl-[78px] pr-[105px] text-white",
          inputWrapper: "bg-default-100",
          label: "pl-[90px] pr-[105px] ",
        }}
        onChange={(e) => onChange(e.target.value)}
        label="URL du portfolio"
        placeholder="Ex: votre-site"
        description="Utilisez uniquement des lettres, chiffres, - et _"
        value={value}
        isRequired
      />
      <div
        className={`absolute  text-white pointer-events-none bg-default-200 p-4 left-0 rounded-l-xl top-0 z-40 `}
      >
        https://
      </div>
      <div
        className={`absolute  text-white pointer-events-none bg-default-200 p-4 right-0 rounded-r-xl top-0 z-40`}
      >
        .foliode.com
      </div>
    </div>
  );
};

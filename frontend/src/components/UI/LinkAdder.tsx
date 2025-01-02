"use client";

import React, { useState } from "react";
import Buttons from "@/components/UI/button";

import { LuX, LuListPlus } from "react-icons/lu";
import { Input } from "@nextui-org/react";
interface Link {
  name: string;
  link: string;
}

interface LinkAdderProps {
  onChange: (links: Link[]) => void;
}

export default function LinkAdder({ onChange }: LinkAdderProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const addLink = () => {
    if (name && link) {
      setLinks([...links, { name, link }]);
      onChange([...links, { name, link }]);
      setName("");
      setLink("");
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
    onChange(links.filter((_, i) => i !== index));
  };

  const inputStyles = {
    input: "px-2 py-1 text-gray-400 bg-foreground focus:gray-blue-800",
    inputWrapper:
      "bg-transparent border-2 border-gray-500 hover:border-gray-300 focus-within:border-primary rounded-md transition-all duration-300 ease-in-out",
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Nom du lien"
          classNames={inputStyles}
          variant="bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="url"
          placeholder="URL du lien"
          value={link}
          classNames={inputStyles}
          variant="bordered"
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={addLink}>
          <LuListPlus className="w-4 h-4" />
        </button>
      </div>

      <ul className="space-y-2">
        {links.map((link, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-400 rounded p-2"
          >
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 hover:underline my-2"
            >
              {link.name}
            </a>
            <Buttons
              text="Supprimer"
              style="form"
              className="bg-red-700 w-auto"
              onClick={() => removeLink(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

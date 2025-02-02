"use client";

import React, { useState } from "react";
import Buttons from "@/components/UI/button";

import { LuX, LuListPlus } from "react-icons/lu";
import { Input } from "@heroui/react";

interface Link {
  name: string;
  url: string;
}

interface LinkAdderProps {
  onChange: (links: Link[]) => void;
  value?: Link[];
}

export default function LinkAdder({ onChange, value }: LinkAdderProps) {
  const [links, setLinks] = useState<Link[]>(value !== undefined ? value : []);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const addLink = () => {
    if (name && url) {
      const newLinks = [...links, { name, url }];
      setLinks(newLinks);
      onChange(newLinks);
      setName("");
      setUrl("");
    }
  };

  const removeLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    onChange(updatedLinks);
  };

  return (
    <div className="w-full  space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Nom du lien"
          className="flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="url"
          placeholder="URL du lien"
          value={url}
          className="flex-1"
          onChange={(e) => setUrl(e.target.value)}
        />
        <div onClick={addLink} className="flex items-center justify-center">
          <LuListPlus className="w-4 h-4 text-2xl font-bold text-blue-600" strokeWidth={3}
           />
        </div>
      </div>

      <ul className="space-y-2">
        {links.map((link, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-400 rounded p-2"
          >
            <a
              href={link.url}
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

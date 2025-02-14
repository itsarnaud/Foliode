"use client";

import React, { useState } from "react";
import Buttons from "@/components/UI/button";

import { FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { Input, Link } from "@heroui/react";

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
    <div className="w-full">
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
        <div onClick={addLink} className="flex items-center justify-cente cursor-pointer">
          <FaPlusCircle className="text-primary duration-200 hover:text-primary-200 hover:scale-110" />
        </div>
      </div>

      <ul className="flex flex-col gap-2 mt-2">
        {links.map((link, index) => (
          <li key={index} className="flex items-center justify-between rounded-xl px-2 py-3 ring-1 ring-primary">
            <Link showAnchorIcon href={link.url} className="!text-primary !text-sm">{link.name}</Link>

            <div onClick={() => removeLink(index)} className="cursor-pointer">
              <RiDeleteBin5Fill className="text-red-500 duration-200 hover:text-red-700 hover:scale-110" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

'use client';

import React, { useState, KeyboardEvent, useRef }  from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Input, Link }      from '@heroui/react';

import { ExternalLink, LinkAdderProps } from '@/interfaces/Link';

export default function LinkAdder({ onChange, value }: LinkAdderProps) {
  const [links, setLinks] = useState<ExternalLink[]>(value !== undefined ? value : []);
  const [name, setName]   = useState("");
  const [url, setUrl]     = useState("");
  const [error, setError] = useState<string | null>(null);
  const nameInputRef      = useRef<HTMLInputElement>(null);

  const validateUrl = (url: string): boolean => {
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    setUrl(formattedUrl);

    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return urlRegex.test(url);
  };

  const addLink = () => {
    if (name && url) {
      if (!validateUrl(url)) {
        setError("L'URL doit être au format https://exemple.fr");
        return;
      }
      setError(null);
      const newLinks = [...links, { name, url }];
      setLinks(newLinks);
      onChange(newLinks);
      setName("");
      setUrl("");
      
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 0);
    }
  };

  const removeLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    onChange(updatedLinks);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name && url) {
      e.preventDefault();
      addLink();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">Lien du projet</label>
      <div className="flex space-x-2">
        <Input
          ref={nameInputRef}
          type="text"
          placeholder="Foliode"
          className="flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="text"
          placeholder="https://foliode.com"
          value={url}
          className="flex-1"
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          color={error ? "danger" : "default"}
        />
      </div>
      <span className="text-sm text-danger mt-1">{error}</span>
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
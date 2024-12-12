"use client";

import { Accordion as NextUIAccordion, AccordionItem } from "@nextui-org/react";

interface AccordionItemData {
  key: string;
  title: string;
  subtitle: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  variant?: "light" | "shadow" | "bordered" | "splitted";
  className?: string;
}

export default function Accordion({ items, variant = "bordered", className = "" }: AccordionProps) {
  return (
    <NextUIAccordion variant={variant} className={className}>
      {items.map((item) => (
        <AccordionItem
          key={item.key}
          aria-label={item.title} 
          title={item.title}
          subtitle={item.subtitle}
        >
          {item.content}
        </AccordionItem>
      ))}
    </NextUIAccordion>
  );
}
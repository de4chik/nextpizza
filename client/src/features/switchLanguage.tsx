"use client";
import { CheckIcon, GlobeIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const SwitchLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <span
        className="flex items-center gap-2 group hover:text-primary duration-200 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <GlobeIcon size={16} className="group-hover:rotate-12 " /> Язык
      </span>
      {isOpen && (
        <div className="p-3 text-sm rounded-2xl bg-muted-foreground absolute top-full left-1/2 -translate-x-1/2 mt-2">
          <ul className="flex flex-col gap-2">
            <li className="flex gap-10">Английский</li>
            <li className="flex gap-10">
              Руччкий <CheckIcon size={16} className="stroke-primary" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

"use client";
import { cn } from "@/root/utils/cn.util";
import { XIcon } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

interface IDialogContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogContext = createContext<IDialogContext>({
  isOpen: false,
  setIsOpen: () => {},
});

export const Dialog: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogContent: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  const { isOpen, setIsOpen } = useContext(DialogContext);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-dvh bg-background/20 backdrop-blur-sm z-50 flex items-center justify-center",
        className,
      )}
      id="bialog-bg"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export const DialogCloseButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { setIsOpen } = useContext(DialogContext);

  return (
    <>
      <XIcon onClick={() => setIsOpen(false)} className={cn('cursor-pointer',className)} />
    </>
  );
};

export const DialogTrigger: React.FC<
  React.PropsWithChildren<{ render?: React.ReactElement }>
> = ({ children, render }) => {
  const { setIsOpen } = useContext(DialogContext);

  if (children)
    return <button onClick={() => setIsOpen(true)}>{children}</button>;

  if (!React.isValidElement(render)) return null;

  return React.cloneElement(render, {
    onClick: () => {
      setIsOpen(true);
    },
  } as React.Attributes);
};

import { cn } from "@/root/utils/cn.util";

interface IInput extends React.ComponentPropsWithoutRef<"input"> {
  className?: string;
  errorMessage?: string;
  title?: string;
}

export const Input: React.FC<IInput> = ({
  className,
  errorMessage,
  title,
  ...props
}) => {
  return (
    <label>
      {title && <span className="text-sm pl-2">{title}</span>}
      <input
        className={cn(
          "p-4 rounded-2xl bg-foreground/5 w-full outline-none font-bold disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
      {errorMessage && (
        <span className="text-red-500 text-sm pl-2">{errorMessage}</span>
      )}
    </label>
  );
};

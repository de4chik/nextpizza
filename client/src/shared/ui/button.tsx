import { cn } from "@/root/utils/cn.util";

const variants = {
  fullfield: "bg-primary hover:opacity-90",
};
interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
  variant?: keyof typeof variants;
}

export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
  children,
  className,
  variant = "fullfield",
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-full p-4 font-bold  duration-100 active:scale-95 cursor-pointer flex items-center justify-center gap-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

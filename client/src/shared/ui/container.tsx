import { cn } from "@/root/utils/cn.util";

interface IContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<IContainerProps>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("max-w-6xl w-full mx-auto px-5", className)} {...props}>
      {children}
    </div>
  );
};

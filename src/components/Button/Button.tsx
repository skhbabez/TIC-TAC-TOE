import clsx from "clsx";
import type { ComponentProps } from "react";

interface PrimaryButtonProps extends ComponentProps<"button"> {
  variant: "primary";
  color: "yellow" | "blue";
}

interface SecondaryButtonProps extends ComponentProps<"button"> {
  variant: "secondary";
  color: "silver" | "yellow";
}

type ButtonProps = PrimaryButtonProps | SecondaryButtonProps;

const Button = ({
  variant,
  color,
  className,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "text-heading-s rounded-[0.9375rem] inset-shadow-lg pt-[1.0625rem] pb-[1.5625rem]",
    secondary:
      "text-heading-xs rounded-[0.625rem] inset-shadow-md pt-[0.9375rem] pb-[1.0625rem]",
  };

  const colors = {
    yellow:
      "bg-light-yellow inset-shadow-light-yellow-b hover:bg-light-yellow-h",
    blue: "bg-light-blue inset-shadow-light-blue-b hover:bg-light-blue-h",
    silver: "bg-silver inset-shadow-silver-b hover:bg-silver-h",
  };

  return (
    <button
      type="button"
      className={clsx(
        variants[variant],
        colors[color],
        "font-display px-4 focus-visible:outline-2 transition duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

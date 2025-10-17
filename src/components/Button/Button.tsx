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

// add outlines and focus states. replace border with shadow?
const Button = ({
  variant,
  color,
  className,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "text-heading-s rounded-[0.9375rem] border-b-8 py-[1.0625rem]",
    secondary:
      "text-heading-xs rounded-[0.625rem] border-b-4 pb-[0.8125rem] pt-[0.9375rem]",
  };

  const colors = {
    yellow: "bg-light-yellow border-light-yellow-b hover:bg-light-yellow-h",
    blue: "bg-light-blue border-light-blue-b hover:bg-light-blue-h",
    silver: "bg-silver border-silver-b hover:bg-silver-h",
  };

  return (
    <button
      type="button"
      className={clsx(
        variants[variant],
        colors[color],
        "px-4 border-solid transition duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

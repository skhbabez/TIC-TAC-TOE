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
      "text-heading-xs md:text-heading-s rounded-l inset-shadow-l pt-[1.0625rem] pb-[1.5625rem]",
    secondary:
      "text-heading-xs rounded-m inset-shadow-m pt-[0.9375rem] pb-[1.0625rem]",
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
        "px-4 text-dark-navy focus-visible:outline-2 transition duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

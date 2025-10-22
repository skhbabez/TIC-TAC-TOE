import clsx from "clsx";
import type { ComponentProps } from "react";

const Dialog = ({
  children,
  className,
  ...props
}: ComponentProps<"dialog">) => {
  return (
    <dialog
      className={clsx(
        "bg-semi-dark-navy backdrop:bg-black/50 max-w-screen w-screen min-h-[14.25rem] md:min-h-[16.625rem] top-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      {children}
    </dialog>
  );
};
export default Dialog;

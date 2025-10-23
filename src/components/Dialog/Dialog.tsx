import clsx from "clsx";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

interface DialogProps extends ComponentPropsWithoutRef<"dialog"> {
  show: boolean;
}

const Dialog = ({ show, children, className, ...props }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !show) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && show) {
      dialogRef.current?.showModal();
    }
  }, [show]);

  return (
    <dialog
      className={clsx(
        "bg-semi-dark-navy backdrop:bg-black/50 max-w-screen w-screen min-h-[14.25rem] md:min-h-[16.625rem] top-1/2 -translate-y-1/2",
        className
      )}
      ref={dialogRef}
      {...props}
    >
      {children}
    </dialog>
  );
};
export default Dialog;

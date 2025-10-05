import type { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

function Button({ href, children, className, ...props }: ButtonProps) {
  const baseClasses =
    "rounded-xl py-[6px] px-[16px] bg-gray-900 hover:bg-gray-700 active:bg-gray-800 transition-colors";

  if (href) {
    return (
      <a
        href={href}
        className={clsx(
          baseClasses,
          "body2 font-[500] text-gray-50",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={clsx(baseClasses, "body2 font-[500] text-gray-50", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

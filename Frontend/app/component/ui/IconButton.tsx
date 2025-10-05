import clsx from "clsx";
import type { ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
  href?: string;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
  icon,
  href,
  className,
  ...props
}: IconButtonProps) {
  const baseClasses =
    "flex cursor-pointer justify-center items-center w-9 h-9 md:w-11 md:h-11 p-[6px] rounded-lg bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 active:text-gray-600 transition-colors";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        className={clsx(baseClasses, className)}
        {...props}
      >
        {icon}
      </a>
    );
  }

  return (
    <button className={clsx(baseClasses, className)} {...props}>
      {icon}
    </button>
  );
}

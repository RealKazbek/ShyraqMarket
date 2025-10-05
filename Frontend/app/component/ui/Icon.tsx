import clsx from "clsx";
import type { ReactNode } from "react";

type IconProps = {
  icon: ReactNode;
  className?: string;
  href?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.HTMLAttributes<HTMLSpanElement>;

export function Icon({ icon, className, href, ...props }: IconProps) {
  const baseClasses =
    "flex justify-center items-center w-6 h-6 md:w-8 md:h-8 text-gray-900";

  if (href) {
    return (
      <a
        href={href}
        className={clsx(baseClasses, className)}
        {...props}
      >
        {icon}
      </a>
    );
  }

  return (
    <span className={clsx(baseClasses, className)} {...props}>
      {icon}
    </span>
  );
}
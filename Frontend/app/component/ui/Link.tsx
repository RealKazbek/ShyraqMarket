import type { ReactNode } from "react";
import { cn } from "~/lib/utils/cn";

type LinkProps = {
  href?: string;
  children: ReactNode;
  variant?: "menu" | "normal";
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.HTMLAttributes<HTMLSpanElement>;

function Link({ href, children, variant = "menu", className, ...props }: LinkProps) {
  const baseClasses = cn(
    "body2 cursor-pointer text-gray-600 hover:text-gray-900 active:text-gray-600 transition-colors",
    {
      "font-[500]": variant === "menu",
      "font-[400] underline [text-decoration-skip-ink:none]":
        variant === "normal",
    },
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <span className={baseClasses} {...props}>
      {children}
    </span>
  );
}

export default Link;

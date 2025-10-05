import type { ReactNode } from "react";
import { cn } from "~/lib/utils/cn";

type TagProps = {
  children: ReactNode;
  href?: string;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.HTMLAttributes<HTMLDivElement>;

function Tag({ children, href, className, ...props }: TagProps) {
  const baseClasses = cn(
    "cursor-pointer rounded-xl py-1 px-5 bg-gray-200 flex justify-center items-center",
    className
  );

  const textClasses = "body2 font-[500] text-gray-600";

  if (href) {
    return (
      <a href={href} className={baseClasses} {...props}>
        <span className={textClasses}>{children}</span>
      </a>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      <span className={textClasses}>{children}</span>
    </div>
  );
}

export default Tag;

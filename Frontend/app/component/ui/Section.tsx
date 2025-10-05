import React from "react";
import { cn } from "~/lib/utils/cn";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  variant?: "default" | "gray";
};

function Section({
  children,
  className = "",
  variant = "default",
  ...props
}: SectionProps) {
  const variantClasses = {
    default: "bg-gray-50",
    gray: "bg-gray-100",
  };

  return (
    <section className={cn("w-full", variantClasses[variant])} {...props}>
      <div className={cn("container py-24", className)}>{children}</div>
    </section>
  );
}

export default Section;

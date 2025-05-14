import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={twMerge(
      "px-4 py-2 rounded font-semibold transition disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";

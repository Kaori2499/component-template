import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "default" | "primary";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual style */
  variant?: ButtonVariant;
};

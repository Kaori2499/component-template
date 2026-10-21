import type { ButtonProps } from "./types";

export function Button({
  variant = "default",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const classes = ["ct-button", `ct-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      data-ct-button=""
      data-variant={variant}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}

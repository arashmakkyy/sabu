import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "icon";

export function Button({
  className,
  variant = "primary",
  type = "button",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type={type}
      className={cn(
        "tap inline-flex items-center justify-center gap-2 font-medium select-none",
        "disabled:pointer-events-none disabled:opacity-40",
        variant === "primary" &&
          "h-14 w-full rounded-full bg-primary px-5 text-base text-primary-fg shadow-[0_8px_20px_-10px_rgba(78,122,92,0.7)]",
        variant === "secondary" &&
          "h-12 rounded-full bg-card px-4 text-sm text-ink shadow-card",
        variant === "ghost" && "h-11 rounded-full px-3 text-sm text-ink-soft",
        variant === "icon" &&
          "size-11 rounded-full bg-card text-ink shadow-card",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function IconButton({
  className,
  children,
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "tap grid size-11 place-items-center rounded-full bg-card text-ink shadow-card",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Switch({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative h-7 w-12 rounded-full transition-colors duration-200",
        checked ? "bg-primary" : "bg-mint",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-6 rounded-full bg-card shadow-sm transition-[inset-inline-start] duration-200",
          checked ? "start-5" : "start-0.5",
        )}
      />
    </button>
  );
}

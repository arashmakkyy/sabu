import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SubHeader({
  title,
  subtitle,
  onMore,
  end,
}: {
  title: string;
  subtitle?: string;
  onMore?: () => void;
  end?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <header className="relative px-4 pt-4 pb-2">
      <div className="flex h-12 items-center justify-center">
        <button
          type="button"
          aria-label="برگشت"
          onClick={() => navigate({ to: "/" })}
          className="tap absolute top-4 left-3 grid size-11 place-items-center rounded-full text-ink"
        >
          <ChevronLeft className="size-6" strokeWidth={1.8} />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="mt-0.5 max-w-56 text-xs leading-5 text-muted">{subtitle}</p>
          )}
        </div>
        {(onMore || end) && (
          <div className="absolute top-4 right-3">
            {end ?? (
              <button
                type="button"
                aria-label="گزینه‌ها"
                onClick={onMore}
                className="tap grid size-11 place-items-center rounded-full text-ink"
              >
                <MoreHorizontal className="size-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export function Page({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-full flex-col px-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

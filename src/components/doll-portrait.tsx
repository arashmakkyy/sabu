import { cn } from "@/lib/cn";
import { getDoll } from "@/lib/dolls";

export function DollPortrait({
  dollId,
  className,
  alt,
}: {
  dollId: string;
  className?: string;
  alt?: string;
}) {
  const doll = getDoll(dollId);
  return (
    <img
      src={doll.image}
      alt={alt ?? doll.name}
      width={640}
      height={640}
      decoding="async"
      className={cn("block size-full object-cover object-center", className)}
    />
  );
}

export function DollTile({
  dollId,
  selected,
  onSelect,
  label,
}: {
  dollId: string;
  selected?: boolean;
  onSelect?: () => void;
  label?: string;
}) {
  const doll = getDoll(dollId);
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "tap relative overflow-hidden rounded-2xl bg-card shadow-card",
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-bg",
      )}
    >
      <div className="aspect-square">
        <DollPortrait dollId={dollId} alt="" />
      </div>
      {selected && (
        <span className="absolute top-2 left-2 grid size-6 place-items-center rounded-full bg-primary text-primary-fg">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M2.2 6.2 4.6 8.6 9.8 3.4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      {label && (
        <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/50 to-transparent px-2 pb-2 pt-6 text-center text-xs text-primary-fg">
          {label}
        </span>
      )}
      <span className="sr-only">{doll.name}</span>
    </button>
  );
}

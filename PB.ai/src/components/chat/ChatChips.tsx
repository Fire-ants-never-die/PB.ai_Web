import { cn } from '@/lib/utils';

export interface Chip {
  id: string;
  label: string;
}

interface ChatChipsProps {
  chips: Chip[];
  onChipClick: (chip: Chip) => void;
  className?: string;
}

export function ChatChips({ chips, onChipClick, className }: ChatChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)} style={{ gap: '0.5rem' }}>
      {chips.map((chip) => (
        <button
          key={chip.id}
          onClick={() => onChipClick(chip)}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            "px-4 py-2 rounded-full",
            "bg-[#F5F5F5] hover:bg-[#E5E5E5]",
            "text-sm text-[#191B1C]",
            "transition-colors duration-200",
            "cursor-pointer"
          )}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

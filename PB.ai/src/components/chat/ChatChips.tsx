import { cn } from '@/lib/utils';

export interface Chip {
  id: string;
  label: string;
}

interface ChatChipsProps {
  chips: Chip[];
  onChipClick: (chip: Chip) => void;
  className?: string;
  selectedChipId?: string | null;
}

export function ChatChips({ chips, onChipClick, className, selectedChipId }: ChatChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)} style={{ gap: '0.5rem' }}>
      {chips.map((chip) => (
        <button
          key={chip.id}
          onClick={() => onChipClick(chip)}
          onMouseDown={(e) => e.stopPropagation()}
          aria-pressed={selectedChipId === chip.id}
          className={cn(
            "px-4 py-2 rounded-full border border-transparent",
            "text-sm transition-colors duration-200 cursor-pointer",
            selectedChipId === chip.id
              ? "bg-[#5797F7] text-white hover:bg-[#3F7EE0]"
              : "bg-[#F5F5F5] text-[#191B1C] hover:bg-[#E5E5E5]"
          )}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

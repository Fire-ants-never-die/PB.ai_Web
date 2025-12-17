import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  className?: string;
  onClick?: () => void;
}

export function FloatingActionButton({ className, onClick }: FloatingActionButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log('New chat button clicked');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed z-40",
        "flex items-center justify-center gap-2",
        "transition-all duration-300 ease-out",
        "hover:scale-105 hover:shadow-xl hover:brightness-110",
        "active:scale-95",
        "group",
        className
      )}
      style={{
        top: '50%',
        right: '26px',
        transform: 'translateY(-50%) translateX(50%) rotate(-90deg)',
        transformOrigin: 'center',
        width: '14.8125rem',
        height: '3.25rem',
        borderRadius: '4.3125rem 4.3125rem 0 0',
        background: '#64A6FA',
        color: 'white'
      }}
    >
      {/* Icon */}
      <Plus
        className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
        strokeWidth={2.5}
      />

      {/* Text */}
      <span className="font-semibold text-sm tracking-wide">
        new chat
      </span>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-t-[4.3125rem] bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </button>
  );
}


import { BarChart, PieChart, BarChart3, Wallet, LineChart, Globe, DollarSign, Settings, ChevronRight, ChevronLeft, Home, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function Sidebar({ isCollapsed, onToggle, className }: SidebarProps) {
  const location = useLocation();

  const navItems = [
  {
    title: 'Dashboard',
    icon: Home,
    href: '/'
  },
  {
    title: 'Market News',
    icon: Newspaper,
    href: '/market-news'
  },
  {
    title: 'Stocks',
    icon: BarChart,
    href: '/stocks'
  },
  {
    title: 'Markets',
    icon: BarChart3,
    href: '/markets'
  },
  {
    title: 'Currencies',
    icon: DollarSign,
    href: '/currencies'
  },
  {
    title: 'Global',
    icon: Globe,
    href: '/global'
  },
  {
    title: 'Portfolio',
    icon: Wallet,
    href: '/portfolio'
  },
  {
    title: 'Performance',
    icon: LineChart,
    href: '/performance'
  },
  {
    title: 'Analysis',
    icon: PieChart,
    href: '/analysis'
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings'
  }];


  return (
    <aside className={cn(
      "bg-gray-900 text-gray-100 fixed left-0 top-0 h-full z-10 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-800",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex h-16 items-center justify-center border-b border-gray-800 mt-16">
        <h2 className={cn(
          "font-semibold tracking-tight transition-opacity duration-200 text-white",
          isCollapsed ? "opacity-0" : "opacity-100"
        )} style={{ fontSize: '18px' }}>MarketPulse

        </h2>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "absolute right-2 text-gray-300 hover:text-white hover:bg-gray-800 h-8 w-8",
            isCollapsed ? "right-2" : "right-4"
          )}>

          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 py-6 overflow-hidden">
        <nav className={cn(
          "grid gap-2",
          isCollapsed ? "px-2" : "px-3"
        )}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white",
                  isActive ? "bg-[#FF5E00] text-white" : "text-gray-300",
                  isCollapsed ? "justify-center px-2 py-2.5 mx-2" : "px-3 py-2.5"
                )}>

                <item.icon className={cn("h-5 w-5 shrink-0")} />
                <span className={cn(
                  "font-medium transition-opacity duration-200",
                  isCollapsed ? "opacity-0 w-0" : "opacity-100"
                )} style={{ fontSize: '14px' }}>
                  {item.title}
                </span>
              </Link>);

          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className={cn(
          "transition-opacity duration-200 rounded-lg bg-gray-800/70 p-3",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          <p className="font-semibold text-white mb-1" style={{ fontSize: '12px' }}>Market Status</p>
          <p className="text-gray-300 mb-1" style={{ fontSize: '12px' }}>Markets are open</p>
          <p className="text-gray-400" style={{ fontSize: '12px' }}>Closes in 3h 45m</p>
        </div>
      </div>
    </aside>);

}

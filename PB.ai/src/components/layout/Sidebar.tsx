
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
      "bg-white text-gray-700 fixed left-0 top-0 h-full z-10 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200 shadow-sm",
      isCollapsed ? "w-20" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex h-16 items-center border-b border-gray-200 mt-16 relative px-4">
        {!isCollapsed && (
          <h2 className="font-bold tracking-tight text-gray-900 text-lg transition-opacity duration-200">
            PB.ai
          </h2>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "absolute text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-9 w-9 rounded-lg transition-all duration-200",
            isCollapsed ? "left-1/2 -translate-x-1/2" : "right-3"
          )}>
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <nav className={cn(
          "flex flex-col gap-1",
          isCollapsed ? "px-2" : "px-3"
        )}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl transition-all duration-200",
                  isCollapsed ? "justify-center px-3 py-3" : "px-4 py-3",
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}>

                {/* Active Indicator */}
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                )}

                {/* Icon */}
                <div className={cn(
                  "flex items-center justify-center shrink-0 transition-all duration-200",
                  isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-900"
                )}>
                  <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>

                {/* Text */}
                {!isCollapsed && (
                  <span className={cn(
                    "font-medium text-sm transition-colors duration-200",
                    isActive ? "text-blue-600" : "text-gray-700 group-hover:text-gray-900"
                  )}>
                    {item.title}
                  </span>
                )}

                {/* Collapsed Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.title}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer - Market Status */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="font-semibold text-gray-900 text-sm">Market Status</p>
            </div>
            <p className="text-gray-600 text-xs mb-1">Markets are open</p>
            <p className="text-gray-500 text-xs">Closes in 3h 45m</p>
          </div>
        </div>
      )}

      {/* Collapsed Footer Indicator */}
      {isCollapsed && (
        <div className="p-4 border-t border-gray-200 flex justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      )}
    </aside>
  );
}

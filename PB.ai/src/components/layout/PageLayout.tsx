
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 relative">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

        <main className={cn(
          "transition-all duration-300 min-h-screen pt-6",
          isSidebarCollapsed ? "ml-20" : "ml-72"
        )}>
          <div className="container max-w-full p-4 lg:p-6 animate-fade-in">
            <h1 className="font-bold mb-6" style={{ fontSize: '18px' }}>{title}</h1>
            {children}
          </div>
        </main>
      </div>
    </div>);

}

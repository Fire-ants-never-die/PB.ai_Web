---
name: stock-layout
description: 레이아웃 컴포넌트 생성 (사이드바 토글 포함)
---
Create responsive layout with toggleable sidebar and center-aligned content.

# Requirements

1. **Sidebar**:

   - Width: 240px (open) / 0px (closed)
   - Smooth transitions (300ms)
   - Persistent state (localStorage)
2. **Main Content**:

   - Always center-aligned
   - Max-width: 1280px
   - Responsive padding
   - Adapts to sidebar state
3. **Mobile**:

   - Sidebar overlay on mobile
   - Backdrop on mobile
   - Swipe to close

# Implementation Pattern

```tsx
'use client';
import { useState, useEffect } from 'react';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-open');
    if (saved !== null) setSidebarOpen(JSON.parse(saved));
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebar-open', JSON.stringify(newState));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className={`
        bg-gray-900 text-white transition-all duration-300
        ${sidebarOpen ? 'w-60' : 'w-0'}
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar content */}
      </aside>

      <main className="flex-1 overflow-auto flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
```

Create this with full mobile responsiveness!

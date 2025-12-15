---
name: stock-chat
description: 드래그 가능한 AI 채팅 위젯 생성
---
Create draggable AI chat widget with persistent position.

# Requirements

1. **Drag System**: react-draggable
2. **States**:

   - Minimized: Floating button (bottom-right)
   - Open: Full chat interface (400x600px)
   - Dragging: Visual feedback
3. **Persistence**:

   - Save position to localStorage
   - Save open/closed state
4. **Constraints**:

   - Stay within viewport
   - Snap to edges on mobile

# Implementation

```tsx
'use client';
import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedPos = localStorage.getItem('chat-position');
    const savedOpen = localStorage.getItem('chat-open');
    if (savedPos) setPosition(JSON.parse(savedPos));
    if (savedOpen) setIsOpen(JSON.parse(savedOpen));
  }, []);

  const handleDrag = (e: any, data: any) => {
    const newPos = { x: data.x, y: data.y };
    setPosition(newPos);
    localStorage.setItem('chat-position', JSON.stringify(newPos));
  };

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('chat-open', JSON.stringify(newState));
  };

  return (
    <Draggable
      position={position}
      onStop={handleDrag}
      bounds="parent"
      handle=".drag-handle"
    >
      <div className={`fixed z-50 ${isOpen ? 'w-96 h-96' : 'w-14 h-14'}`}>
        {isOpen ? (
          <div className="bg-white rounded-lg shadow-2xl">
            <div className="drag-handle cursor-move p-4 border-b">
              Chat with AI
            </div>
            {/* Chat content */}
          </div>
        ) : (
          <button
            onClick={toggleChat}
            className="w-full h-full bg-blue-600 rounded-full"
          >
            💬
          </button>
        )}
      </div>
    </Draggable>
  );
}
```

Add smooth animations between states!

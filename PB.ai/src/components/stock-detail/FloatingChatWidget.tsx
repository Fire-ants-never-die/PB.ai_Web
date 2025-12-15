import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useAppStore } from '@/lib/store';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  MessageSquare,
  X,
  Minus,
  Send,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type { ChatMessage } from '@/lib/types';

export function FloatingChatWidget() {
  const { chatWidget, toggleChatWidget, minimizeChatWidget, closeChatWidget, setChatWidgetPosition } =
    useAppStore();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: '답변을 생성 중입니다. 잠시만 기다려주세요...',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Minimized button
  if (!chatWidget.isOpen) {
    return (
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={toggleChatWidget}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  // Chat content
  const chatContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            AI
          </div>
          <div>
            <h3 className="font-semibold">AI 분석 도우미</h3>
            <p className="text-xs text-muted-foreground">온라인</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={minimizeChatWidget}
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={closeChatWidget}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea
        className="flex-1 p-4"
        ref={scrollAreaRef}
      >
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-semibold">
                무엇을 도와드릴까요?
              </h3>
              <p className="text-sm text-muted-foreground">
                주식에 대해 궁금한 점을 물어보세요.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="메시지를 입력하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Mobile: render as full-screen sheet
  if (isMobile) {
    return (
      <Sheet open={chatWidget.isOpen} onOpenChange={closeChatWidget}>
        <SheetContent side="right" className="w-full p-0">
          {chatContent}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: render as draggable widget
  return (
    <Draggable
      handle=".drag-handle"
      bounds="parent"
      position={{
        x: chatWidget.position.x,
        y: chatWidget.position.y,
      }}
      onStop={(_, data) => {
        setChatWidgetPosition({ x: data.x, y: data.y });
      }}
    >
      <div
        className={`fixed z-50 ${
          isExpanded ? 'h-[600px] w-[500px]' : 'h-[500px] w-[400px]'
        }`}
        style={{
          bottom: 'auto',
          right: 'auto',
        }}
      >
        <Card className="h-full overflow-hidden shadow-2xl">
          <div className="drag-handle h-full cursor-move">{chatContent}</div>
        </Card>
      </div>
    </Draggable>
  );
}

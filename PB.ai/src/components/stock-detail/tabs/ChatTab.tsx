import { useChatHistory } from '@/lib/api/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare, Calendar } from 'lucide-react';
import { CHAT_LABELS } from '@/lib/data/static';
import { useState } from 'react';

interface ChatTabProps {
  code: string;
}

export function ChatTab({ code }: ChatTabProps) {
  const { data: chatHistory, isLoading } = useChatHistory(code);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  const filteredHistory = chatHistory?.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="대화 내용 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Suggestions */}
      {!searchQuery && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">추천 질문</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {CHAT_LABELS.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto justify-start text-left"
                onClick={() => setSearchQuery(suggestion)}
              >
                <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
                <span className="line-clamp-2">{suggestion}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Chat History List */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          대화 기록 ({filteredHistory?.length || 0})
        </h3>
        <div className="space-y-3">
          {filteredHistory && filteredHistory.length > 0 ? (
            filteredHistory.map((chat) => (
              <Card
                key={chat.id}
                className="cursor-pointer transition-all hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold">{chat.title}</h4>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {chat.preview}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(chat.timestamp).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {chat.messages.length}개 메시지
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      보기
                    </Button>
                  </div>

                  {/* Show messages preview on expand (optional) */}
                  {/* You can add an expand/collapse functionality here */}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-semibold">대화 기록이 없습니다</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? '검색 결과가 없습니다. 다른 키워드로 검색해보세요.'
                  : '화면 우측 하단의 채팅 버튼을 눌러 대화를 시작해보세요.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      {!searchQuery && filteredHistory && filteredHistory.length > 0 && (
        <Card className="bg-muted">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                💡
              </div>
              <div>
                <h4 className="mb-1 font-semibold">도움말</h4>
                <p className="text-sm text-muted-foreground">
                  각 대화를 클릭하면 전체 내용을 확인할 수 있습니다. 화면
                  우측 하단의 채팅 버튼을 눌러 새로운 질문을 할 수
                  있습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

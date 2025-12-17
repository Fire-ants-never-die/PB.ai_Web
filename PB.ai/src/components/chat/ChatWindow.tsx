import { useState, useRef, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { ChatChips, type Chip } from './ChatChips';
import { tabSections } from '@/lib/data/static/tabSections';
import { chatQuestions } from '@/lib/data/static/chatQuestions';
import { cn } from '@/lib/utils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://pb-ai-server.onrender.com';
interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  activeTab: string;
  isOpen: boolean;
  onClose: () => void;
  companyName?: string;
}

const tabLabels: Record<string, string> = {
  overview: '기업 Overview',
  financial: '재무현황분석',
  investment: '투자지표',
  valuation: '주식가치평가',
};

export function ChatWindow({ activeTab, isOpen, onClose, companyName = '농심' }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedChip, setSelectedChip] = useState<Chip | null>(null);
  const [showSectionQuestions, setShowSectionQuestions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [sendHover, setSendHover] = useState(false);
  const [renderQuestions, setRenderQuestions] = useState<{ id: string; text: string }[]>([]);
  const hideQuestionsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // 현재 탭의 섹션 제목을 chips로 생성
  const sectionChips: Chip[] = (tabSections[activeTab] || []).map((section, index) => ({
    id: `${activeTab}-${index}`,
    label: section,
  }));

  // 현재 탭 이름
  const currentTabLabel = tabLabels[activeTab] || 'Overview';

  // 스크롤을 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const questionsForChip = useMemo(() => {
    if (!selectedChip) return [];
    return chatQuestions[activeTab]?.[selectedChip.label] ?? [];
  }, [activeTab, selectedChip]);

  const questionsVisible = showSectionQuestions && questionsForChip.length > 0 && !!selectedChip;

  // 예상질문 렌더/언마운트 타이밍 관리 (나갈 때도 애니메이션 유지)
  useEffect(() => {
    if (hideQuestionsTimer.current) {
      clearTimeout(hideQuestionsTimer.current);
      hideQuestionsTimer.current = null;
    }
    if (questionsVisible) {
      setRenderQuestions(questionsForChip);
      return;
    }
    hideQuestionsTimer.current = setTimeout(() => setRenderQuestions([]), 220);
    return () => {
      if (hideQuestionsTimer.current) {
        clearTimeout(hideQuestionsTimer.current);
        hideQuestionsTimer.current = null;
      }
    };
  }, [questionsVisible, questionsForChip]);

  // 탭 변경 시 선택 상태 초기화
  useEffect(() => {
    setSelectedChip(null);
    setShowSectionQuestions(false);
  }, [activeTab]);

  // 메시지 전송
  const handleSend = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${++idRef.current}`,
      type: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'user123',
          question,
          tab_name: currentTabLabel,
          company_name: companyName,
        }),
      });
      const data = await res.json();
      const answerText = data?.answer || '답변을 가져오지 못했습니다.';
      const assistantMessage: Message = {
        id: `assistant-${++idRef.current}`,
        type: 'assistant',
        content: answerText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const assistantMessage: Message = {
        id: `assistant-${++idRef.current}`,
        type: 'assistant',
        content: '답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Chip 클릭 처리 (토글)
  const handleChipClick = (chip: Chip) => {
    if (isLoading) return;
    const isSameChip = selectedChip?.id === chip.id;
    if (isSameChip) {
      setSelectedChip(null);
      setShowSectionQuestions(false);
      return;
    }
    setSelectedChip(chip);
    setShowSectionQuestions(true);
  };

  // 입력창에서 Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // 드래그 중
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // 위치 설정 및 부드러운 등장 애니메이션 (열릴 때)
  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => {
      const buttonRight = 26; // px
      const buttonTop = window.innerHeight / 2;
      const chatWidth = 41.125 * 16; // 41.125rem to px
      const estimatedChatHeight = 400; // 대략적인 높이
      setPosition({
        x: window.innerWidth - buttonRight - chatWidth - 20,
        y: buttonTop - estimatedChatHeight / 2,
      });
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  if (!isOpen) return null;

  const sendIconSrc = sendHover ? '/arrow-circle-up-hover.svg' : '/arrow-circle-up.svg';

  return (
    <div
      ref={chatWindowRef}
      className="fixed z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'move',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 200ms ease, transform 200ms ease',
      }}
      onMouseDown={handleMouseDown}
    >
        <div
          className="flex flex-col items-start bg-white rounded-2xl border border-[#F0F2F4] shadow-lg relative"
          style={{
            width: '41.125rem',
            padding: '1rem 1.25rem 1rem 1.375rem',
            gap: '0.625rem',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 4px 8px 0 rgba(240, 242, 244, 1)',
          }}
        >
          {/* AI 로고 */}
          <div className="flex justify-center relative z-10 no-drag">
            <img src="/AI_btn.svg" alt="AI" className="h-auto" />
          </div>

          {/* 제목 - 0.62rem 아래 */}
          <div className="w-full text-left relative z-10 no-drag" style={{ marginTop: '0.62rem' }}>
            <h3
              className="text-[#191B1C] font-semibold"
              style={{
                fontFamily: 'var(--typography-type, "Pretendard GOV")',
                fontSize: '1.1875rem',
                lineHeight: '150%',
                fontWeight: 600,
              }}
            >
              {companyName} {currentTabLabel}에 최적화되어 있어요. 궁금하신 점 모두 물어보세요!
            </h3>
          </div>

          {/* 질문/답변 영역 - 최대 31rem 스크롤 */}
          {(messages.length > 0 || isLoading) && (
            <div
              className="w-full relative z-10 no-drag flex flex-col gap-4 rounded-xl"
              style={{ marginTop: '0rem', padding: '0.25rem 0.25rem 0', height: '21rem', overflowY: 'auto' }}
            >
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col gap-3">
                  {message.type === 'user' && (
                    <div className="text-left">
                      <p
                        className="text-[#191B1C]"
                        style={{
                          fontFamily: 'Pretendard GOV',
                          fontSize: '1rem',
                          lineHeight: '150%',
                          fontWeight: 600,
                        }}
                      >
                        {message.content}
                      </p>
                    </div>
                  )}
                  {message.type === 'assistant' && (
                    <div
                      className="flex flex-col justify-center items-start w-full rounded-lg bg-[#F7F8FA]"
                      style={{
                        padding: '0.625rem 0.75rem',
                        gap: '1rem',
                      }}
                    >
                      <p
                        className="text-[#191B1C]"
                        style={{
                          fontFamily: 'Pretendard GOV',
                          fontSize: '0.9375rem',
                          lineHeight: '150%',
                          fontWeight: 400,
                        }}
                      >
                        {message.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div
                  className="flex flex-col justify-center items-start w-full rounded-lg bg-[#F7F8FA]"
                  style={{
                    padding: '0.625rem 0.75rem',
                    gap: '1rem',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#5797F7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 bg-[#5797F7] rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
                    <div className="w-2.5 h-2.5 bg-[#5797F7] rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* 구분선 + 칩/예상질문 영역 */}
          {(sectionChips.length > 0 || renderQuestions.length > 0) && (
            <div className="w-full relative z-10 no-drag" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #E7E9EB' }}>
              {sectionChips.length > 0 && (
                <div className="w-full" style={{ marginBottom: '0.5rem' }}>
                  <ChatChips
                    chips={sectionChips}
                    onChipClick={handleChipClick}
                    selectedChipId={selectedChip?.id ?? null}
                  />
                </div>
              )}
              <div
                className={cn(
                  "w-full space-y-2 overflow-hidden",
                  "transition-[max-height,opacity,transform] duration-200 ease-in-out",
                  questionsVisible
                    ? "opacity-100 translate-y-0 max-h-96"
                    : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"
                )}
                aria-hidden={!questionsVisible}
              >
                {renderQuestions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => handleSend(question.text)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg",
                        "bg-white hover:bg-[#F0F4FF]",
                        "transition-all duration-150",
                        "text-[#000] text-[0.9375rem] leading-[150%] font-normal",
                        "shadow-sm hover:shadow-md",
                        "transform hover:-translate-y-0.5"
                      )}
                      style={{
                        fontFamily: 'var(--typography-type, "Pretendard GOV")',
                        border: 'none',
                        transitionDelay: `${index * 20}ms`,
                      }}
                    >
                      {question.text}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* 질문 입력 컴포넌트 - 0.75rem 아래 */}
          <div className="w-full relative z-10 no-drag" style={{ marginTop: '0.75rem' }}>
            <div
              className="relative w-full flex flex-col items-start rounded-[0.75rem] border border-[#D7D9DB] bg-white"
              style={{
                padding: '0.75rem 0.75rem 0.6rem 1rem',
              }}
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (inputRef.current) {
                    const el = inputRef.current;
                    el.style.height = 'auto';
                    const maxHeight = 7 * 24; // 7줄 제한
                    const nextHeight = Math.min(el.scrollHeight, maxHeight);
                    el.style.height = `${nextHeight}px`;
                    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
                  }
                }}
                onKeyPress={handleKeyPress}
                placeholder="궁금한 것에 대해 모두 물어보세요"
                className={cn(
                  'w-full pr-14',
                  'text-[#191B1C] placeholder-[#B3B5B7]',
                  'focus:outline-none bg-transparent',
                  'text-[1.0625rem] leading-[150%] font-semibold'
                )}
                style={{
                  fontFamily: 'var(--typography-type, "Pretendard GOV")',
                  caretColor: '#191B1C',
                  color: '#191B1C',
                  minHeight: '44px',
                  lineHeight: '1.5rem',
                  resize: 'none',
                  overflowY: 'hidden',
                }}
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-4 bottom-2 disabled:opacity-50 transition-opacity"
                onMouseEnter={() => setSendHover(true)}
                onMouseLeave={() => setSendHover(false)}
                style={{ marginTop: '0.5rem' }}
              >
                <img
                  src={sendIconSrc}
                  alt="전송"
                  className="w-10 h-10"
                  style={{
                    transition: 'filter 150ms ease',
                  }}
                />
              </button>
            </div>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors z-20 no-drag"
            style={{ cursor: 'pointer' }}
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
  );
}

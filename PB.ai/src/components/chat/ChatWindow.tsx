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

// 마크다운을 HTML로 변환하는 함수
function formatMarkdown(text: string): string {
  if (!text) return '';

  // 테이블 처리 - 먼저 테이블을 처리
  const lines = text.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let inTable = false;
  let tableHeaders: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isTableRow = /^\s*\|.+\|\s*$/.test(line);
    const isTableSeparator = /^\s*\|[\s\-:]+\|\s*$/.test(line);

    if (isTableSeparator) {
      // 테이블 구분선 - 헤더와 데이터를 구분
      if (tableHeaders.length > 0 && !inTable) {
        inTable = true;
        processedLines.push('<table style="width: 100%; border-collapse: collapse; margin-top: 0.75rem; margin-bottom: 0.75rem;">');
        processedLines.push('<thead>');
        processedLines.push('<tr>');
        tableHeaders.forEach(header => {
          processedLines.push(`<th style="border: 1px solid #D7D9DB; padding: 0.5rem 0.75rem; text-align: left; background-color: #F7F8FA; font-weight: 600; font-size: 0.9375rem;">${header.trim()}</th>`);
        });
        processedLines.push('</tr>');
        processedLines.push('</thead>');
        processedLines.push('<tbody>');
        tableHeaders = [];
      }
      continue;
    }

    if (isTableRow) {
      // 리스트가 열려있으면 먼저 닫기
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }

      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');

      if (!inTable) {
        // 헤더 행
        tableHeaders = cells;
      } else {
        // 데이터 행
        processedLines.push('<tr>');
        cells.forEach(cell => {
          processedLines.push(`<td style="border: 1px solid #D7D9DB; padding: 0.5rem 0.75rem; font-size: 0.9375rem;">${cell}</td>`);
        });
        processedLines.push('</tr>');
      }
      continue;
    }

    // 테이블이 열려있고 테이블 행이 아니면 테이블 닫기
    if (inTable && !isTableRow) {
      processedLines.push('</tbody>');
      processedLines.push('</table>');
      inTable = false;
      tableHeaders = [];
    }

    // 리스트 처리
    const isListItem = /^\s*-\s+(.+)$/.test(line);

    if (isListItem) {
      if (!inList) {
        processedLines.push('<ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">');
        inList = true;
      }
      const content = line.replace(/^\s*-\s+(.+)$/, '$1');
      processedLines.push(`<li style="margin-bottom: 0.25rem;">${content}</li>`);
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(line);
    }
  }

  // 마지막에 열려있는 테이블이나 리스트 닫기
  if (inTable) {
    processedLines.push('</tbody>');
    processedLines.push('</table>');
  }
  if (inList) {
    processedLines.push('</ul>');
  }

  let html = processedLines.join('\n');

  // 헤딩 처리 (# 헤딩) - 줄 시작에서만 매칭
  html = html.replace(/^### (.*)$/gim, '<h3 style="font-size: 1rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem; color: #191B1C;">$1</h3>');
  html = html.replace(/^## (.*)$/gim, '<h2 style="font-size: 1.0625rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem; color: #191B1C;">$1</h2>');
  html = html.replace(/^# (.*)$/gim, '<h1 style="font-size: 1.125rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem; color: #191B1C;">$1</h1>');

  // 볼드 처리 (**텍스트**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>');

  // 줄바꿈 처리 (HTML 태그 사이의 줄바꿈은 제외)
  html = html.split('\n').map(line => {
    // 이미 HTML 태그인 경우 그대로 유지
    if (line.trim().startsWith('<') && line.trim().endsWith('>')) {
      return line;
    }
    // 빈 줄은 <br />로 변환
    if (line.trim() === '') {
      return '<br />';
    }
    return line;
  }).join('\n');

  // 연속된 <br />를 정리
  html = html.replace(/(<br \/>\s*){3,}/g, '<br /><br />');

  return html;
}

export function ChatWindow({ activeTab, isOpen, onClose, companyName = '농심' }: ChatWindowProps) {
  // 탭별로 메시지를 분리하여 저장
  const [messagesByTab, setMessagesByTab] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 현재 탭의 메시지 가져오기
  const messages = messagesByTab[activeTab] || [];
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

  // 탭 변경 시 선택 상태 초기화 및 스크롤
  useEffect(() => {
    setSelectedChip(null);
    setShowSectionQuestions(false);
    // 탭 변경 시 스크롤을 맨 아래로
    setTimeout(() => scrollToBottom(), 100);
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

    // 현재 탭에만 메시지 추가
    setMessagesByTab(prev => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), userMessage],
    }));
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
      // 현재 탭에만 메시지 추가
      setMessagesByTab(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), assistantMessage],
      }));
    } catch {
      const assistantMessage: Message = {
        id: `assistant-${++idRef.current}`,
        type: 'assistant',
        content: '답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        timestamp: new Date(),
      };
      // 현재 탭에만 메시지 추가
      setMessagesByTab(prev => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), assistantMessage],
      }));
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
                      <div
                        className="text-[#191B1C] markdown-content"
                        style={{
                          fontFamily: 'Pretendard GOV',
                          fontSize: '0.9375rem',
                          lineHeight: '150%',
                          fontWeight: 400,
                        }}
                        dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
                      />
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

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, FileText, ChevronRight, Moon, Sun, ArrowLeft } from 'lucide-react';
import type { Message, Citation } from '../types/chat';
import { POLICIES } from '../data/policies';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChatViewProps {
  onCitationClick: (citation: Citation) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ onCitationClick, isDarkMode, onToggleTheme, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Workforce Assistant. You can ask me anything about our organization's policies, such as absence, sickness, or parental leave.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const response = generateAIResponse(input);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): Message => {
    const q = query.toLowerCase();
    let content = "I'm sorry, I couldn't find specific information about that in our current policies. Could you please rephrase your question?";
    let citations: Citation[] = [];

    if (q.includes('sick') || q.includes('absence')) {
      content = "According to our Absence and Sickness Policy, if you're unable to work, you must report it by 9:00 AM. For longer absences, different rules apply regarding sick pay and medical evidence.";
      citations = [
        {
          policyId: 'absence-policy',
          sectionId: 'reporting',
          text: 'Employees must report any unplanned absence... no later than 9:00 AM',
          pageNumber: 2
        },
        {
          policyId: 'absence-policy',
          sectionId: 'sick-pay',
          text: 'The first 3 days are unpaid "waiting days"',
          pageNumber: 5
        }
      ];
    } else if (q.includes('parental') || q.includes('maternity') || q.includes('paternity')) {
      content = "Our Parental Leave Policy covers both maternity and paternity leave. Eligible employees can take up to 52 weeks of maternity leave, while paternity leave is typically 1-2 weeks.";
      citations = [
        {
          policyId: 'parental-leave',
          sectionId: 'maternity-entitlement',
          text: 'Eligible employees are entitled to up to 52 weeks of maternity leave',
          pageNumber: 3
        },
        {
          policyId: 'parental-leave',
          sectionId: 'paternity-leave',
          text: 'New fathers or partners are entitled to 1 or 2 weeks of paid Paternity Leave',
          pageNumber: 12
        }
      ];
    }

    return {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content,
      citations,
      timestamp: new Date(),
    };
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 pt-12 flex items-center justify-between shrink-0 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-slate-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
            <Bot className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 dark:text-white text-sm">Policy AI</h1>
            <p className="text-[10px] text-emerald-500 dark:text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
              Online
            </p>
          </div>
        </div>
        <button 
          onClick={onToggleTheme}
          className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={cn(
              "flex flex-col max-w-[85%]",
              m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className={cn(
              "p-3 rounded-2xl text-sm shadow-sm transition-colors duration-300",
              m.role === 'user' 
                ? "bg-emerald-600 dark:bg-emerald-500 text-white rounded-tr-none" 
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none"
            )}>
              {m.content}
            </div>
            
            {/* Citations */}
            {m.citations && m.citations.length > 0 && (
              <div className="mt-2 space-y-2 w-full">
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Sources</p>
                {m.citations.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => onCitationClick(c)}
                    className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-left hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-colors w-full group shadow-sm"
                  >
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 p-1.5 rounded text-emerald-600 dark:text-emerald-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-slate-900 dark:text-slate-100 truncate italic">"{c.text}"</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {POLICIES.find(p => p.id === c.policyId)?.name} • Page {c.pageNumber}
                      </p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover:text-emerald-400" />
                  </button>
                ))}
              </div>
            )}
            
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
              {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 pb-8 transition-colors duration-300">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about policies..."
            className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 p-2 text-emerald-600 dark:text-emerald-500 disabled:text-slate-300 dark:disabled:text-slate-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

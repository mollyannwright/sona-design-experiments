import React, { useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Download } from 'lucide-react';
import { POLICIES } from '../data/policies';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DocumentViewProps {
  policyId: string;
  highlightSectionId?: string;
  onBack: () => void;
}

export const DocumentView: React.FC<DocumentViewProps> = ({ 
  policyId, 
  highlightSectionId, 
  onBack 
}) => {
  const policy = POLICIES.find(p => p.id === policyId);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (highlightSectionId && sectionRefs.current[highlightSectionId]) {
      sectionRefs.current[highlightSectionId]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [highlightSectionId]);

  if (!policy) return null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 pt-12 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h1 className="font-bold text-slate-800 dark:text-white text-sm truncate max-w-[180px]">
              {policy.name}
            </h1>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
          <Download className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </button>
      </div>

      {/* Document Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="bg-white dark:bg-slate-800 p-8 shadow-sm border border-slate-100 dark:border-slate-700 min-h-full rounded-sm">
          <div className="text-center mb-10">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
              Official Policy Document
            </h2>
            <div className="h-0.5 w-16 bg-slate-200 dark:bg-slate-700 mx-auto mt-2" />
          </div>

          <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
            {policy.sections.map((section) => (
              <div
                key={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el; }}
                className={cn(
                  "p-4 rounded-lg transition-all duration-1000",
                  highlightSectionId === section.id 
                    ? "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 -mx-4 px-8 ring-1 ring-yellow-200 dark:ring-yellow-900/50" 
                    : "border-l-4 border-transparent"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                    {section.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans mt-1 uppercase tracking-tighter">
                    Page {section.pageNumber}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 dark:text-slate-600 text-center font-sans">
            © 2026 Workforce Management System. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

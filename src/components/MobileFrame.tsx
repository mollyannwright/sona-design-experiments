import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-950 p-4 transition-colors duration-500">
      {/* Phone Case */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[60px] shadow-2xl border-[8px] border-slate-800 dark:border-slate-900 overflow-hidden ring-1 ring-slate-200/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-800 rounded-full" />
        </div>
        
        {/* Screen Content */}
        <div className="w-full h-full bg-white dark:bg-slate-900 overflow-hidden relative">
          {children}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full z-50" />
      </div>
    </div>
  );
};

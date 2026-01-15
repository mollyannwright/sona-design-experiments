import React from 'react';
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  Briefcase,
  Menu,
  Bell,
  Users
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardViewProps {
  onStartChat: () => void;
  onOpenTable?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onStartChat, onOpenTable }) => {
  const stats = [
    { label: 'Remaining Leave', value: '14 Days', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Next Shift', value: '09:00 AM', sub: 'Tomorrow', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Hours This Week', value: '32.5h', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  ];

  const schedule = [
    { day: 'Mon', date: 'Jan 12', shift: '09:00 - 17:00', type: 'Office' },
    { day: 'Tue', date: 'Jan 13', shift: '09:00 - 17:00', type: 'Remote' },
    { day: 'Wed', date: 'Jan 14', shift: 'Today', type: 'Office', active: true },
    { day: 'Thu', date: 'Jan 15', shift: '09:00 - 17:00', type: 'Remote' },
    { day: 'Fri', date: 'Jan 16', shift: '09:00 - 13:00', type: 'Office' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-6 pt-12 shrink-0">
        <button className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Jane Doe</span>
        </div>
        <button className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 relative">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="px-6 pb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Good Morning, Jane</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Wednesday, 14 Jan 2026</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 px-6 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
            <div className={cn("p-3 rounded-xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</span>
                {stat.sub && <span className="text-[10px] text-slate-400">{stat.sub}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Assistant CTA */}
      <div className="px-6 mb-4">
        <button 
          onClick={onStartChat}
          className="w-full bg-emerald-600 dark:bg-emerald-500 p-4 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 flex items-center justify-between text-white group hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold">Ask AI Assistant</p>
              <p className="text-xs text-emerald-50/80">Policies, leave, and more</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Team Members CTA */}
      {onOpenTable && (
        <div className="px-6 mb-6">
          <button 
            onClick={onOpenTable}
            className="w-full bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between group hover:border-emerald-200 dark:hover:border-emerald-800 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-white">Team Members</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">View and manage your team</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Upcoming Schedule */}
      <div className="px-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900 dark:text-white">This Week</h2>
          <button className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">View Calendar</button>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          {schedule.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "flex items-center justify-between p-4 border-b last:border-0 border-slate-50 dark:border-slate-700/50",
                item.active && "bg-emerald-50/30 dark:bg-emerald-900/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex flex-col items-center justify-center w-12 h-12 rounded-xl",
                  item.active ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                )}>
                  <span className="text-[10px] font-bold uppercase">{item.day}</span>
                  <span className="text-sm font-bold">{item.date.split(' ')[1]}</span>
                </div>
                <div>
                  <p className={cn("text-sm font-bold", item.active ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white")}>
                    {item.shift}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{item.type}</p>
                </div>
              </div>
              {item.active && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/40 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">Current</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

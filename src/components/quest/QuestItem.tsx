'use client';

import { ReactNode } from 'react';
import { CheckmarkIcon } from '@/components/icons';

const QuestCheckbox = ({ checked }: { checked: boolean }) => (
  <div 
    aria-hidden="true"
    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${checked ? 'border-yellow-500 bg-yellow-500' : 'border-yellow-500/60 group-hover:border-yellow-400'}`}
  >
    {checked ? (
      <CheckmarkIcon className="w-3 h-3 text-amber-900" />
    ) : (
      <div className="w-2.5 h-2.5 rounded-sm bg-yellow-500/0 group-hover:bg-yellow-400" />
    )}
  </div>
);

const Strikethrough = ({ show }: { show: boolean }) => (
  show ? <div className="absolute left-0 -right-2 top-1/2 h-0.5 bg-white/80" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.8), 0 -1px 0 rgba(0,0,0,0.8)' }} /> : null
);

export interface QuestItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  xp: number;
  completed: boolean;
  onComplete: () => void;
}

export const QuestItem = ({ href, icon, label, xp, completed, onComplete }: QuestItemProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${label} - ${completed ? 'Completed' : `Earn ${xp} XP`}`}
    className="flex items-center gap-3 p-2.5 rounded bg-white/5 hover:bg-white/10 transition-all duration-150 group cursor-pointer border border-transparent hover:border-yellow-500/30 hover:scale-[1.02] shrink-0"
    onClick={onComplete}
    onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); onComplete(); window.open(href, '_blank'); } }}
  >
    <QuestCheckbox checked={completed} />
    <div className={`inline-flex items-center gap-3 relative ${completed ? 'opacity-60' : ''}`}>
      {icon}
      <span className="text-sm font-bold text-outlined text-white whitespace-nowrap">{label}</span>
      <Strikethrough show={completed} />
    </div>
    <div className="flex-1" />
    <span className="text-xs font-bold flex items-center gap-1 whitespace-nowrap shrink-0 text-green-400">
      {completed ? <><CheckmarkIcon className="w-4 h-4" />Done</> : `+${xp} XP`}
    </span>
  </a>
);

export interface QuestItemButtonProps {
  icon: ReactNode;
  label: string;
  xp: number;
  completed: boolean;
  onClick: () => void;
}

export const QuestItemButton = ({ icon, label, xp, completed, onClick }: QuestItemButtonProps) => (
  <button
    type="button"
    aria-label={`${label} - ${completed ? 'Completed' : `Earn ${xp} XP`}`}
    className="flex items-center gap-3 p-2.5 rounded bg-white/5 hover:bg-white/10 transition-all duration-150 group cursor-pointer border border-transparent hover:border-yellow-500/30 hover:scale-[1.02] shrink-0 w-full text-left"
    onClick={onClick}
  >
    <QuestCheckbox checked={completed} />
    <div className={`inline-flex items-center gap-3 relative ${completed ? 'opacity-60' : ''}`}>
      {icon}
      <span className="text-sm font-bold text-outlined text-white whitespace-nowrap">{label}</span>
      <Strikethrough show={completed} />
    </div>
    <div className="flex-1" />
    <span className="text-xs font-bold flex items-center gap-1 whitespace-nowrap shrink-0 text-green-400">
      {completed ? <><CheckmarkIcon className="w-4 h-4" />Done</> : `+${xp} XP`}
    </span>
  </button>
);

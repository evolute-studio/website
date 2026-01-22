'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { XPBadge, HoverShine } from '@/components/ui';

interface ActionButtonProps {
  href: string;
  icon: ReactNode;
  label: string;
  mobileLabel?: string;
  xp: number;
  earned: boolean;
  onEarn: () => void;
  className?: string;
}

export const ActionButton = ({ href, icon, label, mobileLabel, xp, earned, onEarn, className = '' }: ActionButtonProps) => (
  <div className={`relative group ${className}`}>
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative text-white font-bold py-4 sm:py-3 px-4 sm:px-6 text-base text-center game-btn text-outlined block bg-btn-primary overflow-hidden w-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onEarn}
      onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); onEarn(); window.open(href, '_blank'); } }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
        {icon}
        {mobileLabel ? (
          <>
            <span className="sm:hidden">{mobileLabel}</span>
            <span className="hidden sm:inline">{label}</span>
          </>
        ) : label}
      </span>
      <HoverShine />
    </motion.a>
    <XPBadge xp={xp} earned={earned} />
  </div>
);

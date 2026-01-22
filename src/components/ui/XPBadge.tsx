'use client';

import { motion } from 'framer-motion';

interface XPBadgeProps {
  xp: number;
  earned: boolean;
}

export const XPBadge = ({ xp, earned }: XPBadgeProps) => (
  <motion.span
    className="absolute -top-3 -right-3 text-xs font-bold text-white bg-green-600 px-2 py-1 rounded shadow-lg border border-green-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 pointer-events-none"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={earned
      ? { opacity: 0, y: -80, x: 30, scale: 1.3, rotate: 15 }
      : { opacity: 1, scale: 1 }
    }
    transition={earned ? { duration: 0.5, ease: [0.4, 0, 0.2, 1] } : { duration: 0.15 }}
  >
    +{xp} XP
  </motion.span>
);

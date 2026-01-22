'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LINKS, QUEST_WIDTH, type Platform, type EarnedXP, type XPKey } from '@/lib/constants';
import { PixelCorner } from '@/components/ui';
import { DiscordIcon, XIcon, ChevronIcon } from '@/components/icons';
import { QuestItem, QuestItemButton } from './QuestItem';

interface QuestPanelProps {
  isDesktop: boolean;
  isHydrated: boolean;
  collapsed: boolean;
  onToggle: () => void;
  earnedXP: EarnedXP;
  onEarnXP: (key: XPKey) => void;
  platform: Platform;
  onOpenMageDuelVideo: () => void;
  onOpenMinerVideo: () => void;
}

export const QuestPanel = ({ isDesktop, isHydrated, collapsed, onToggle, earnedXP, onEarnXP, platform, onOpenMageDuelVideo, onOpenMinerVideo }: QuestPanelProps) => {
  const mageDuelLink = platform === 'ios' ? LINKS.appStore : LINKS.playStore;

  return (
    <motion.div
      className="fixed z-10 top-36 left-[4%] right-[4%] sm:top-auto sm:bottom-16 sm:left-4 sm:right-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isHydrated ? 1 : 0, y: isHydrated ? 0 : 50 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="relative border-4 rounded-lg p-4 game-dialog bg-dialog-background border-dialog-border transition-[width] duration-500 ease-in-out"
        style={{ width: isDesktop ? (collapsed ? QUEST_WIDTH.collapsed : QUEST_WIDTH.expanded) : 'auto' }}
      >
        <PixelCorner position="tl" />
        <PixelCorner position="tr" />
        <PixelCorner position="bl" />
        <PixelCorner position="br" />
        <div className="absolute inset-2 border border-yellow-500/20 rounded pointer-events-none" />

        {/* Header */}
        <div
          role="button"
          tabIndex={0}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expand quest panel' : 'Collapse quest panel'}
          className="flex items-center gap-2 select-none cursor-pointer transition-all duration-500 ease-in-out"
          style={{ paddingBottom: collapsed ? 0 : 8, marginBottom: collapsed ? 0 : 12, borderBottom: collapsed ? 'none' : '1px solid rgba(234, 179, 8, 0.3)' }}
          onClick={onToggle}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        >
          <span className="text-yellow-400 text-lg">📜</span>
          <span className="text-yellow-400 text-sm font-bold tracking-wide uppercase whitespace-nowrap">New Quest!</span>
          <span className="flex-1" />
          <span
            className="text-xs text-green-400 font-bold flex items-center gap-1 whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxWidth: collapsed ? 0 : 120, opacity: collapsed ? 0 : 1 }}
          >
            <span className="text-yellow-400">🏆</span>+350 XP Total
          </span>
          <ChevronIcon collapsed={collapsed} />
        </div>

        {/* Quest Items */}
        <div
          className="flex flex-col gap-2 overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: collapsed ? 0 : 260, opacity: collapsed ? 0 : 1 }}
        >
          {/* 1. Play Mage Duel */}
          <QuestItem
            href={mageDuelLink}
            icon={<Image src="/app_icon.png" alt="Mage Duel" width={24} height={24} className="rounded" />}
            label="Play Mage Duel"
            xp={100}
            completed={earnedXP.mage}
            onComplete={() => onEarnXP('mage')}
          />
          {/* 2. Watch Miner Demo */}
          <QuestItemButton
            icon={<Image src="/miner_app.png" alt="Miner" width={24} height={24} className="rounded" />}
            label="Watch Miner Demo"
            xp={75}
            completed={earnedXP.minerVideo}
            onClick={() => { onEarnXP('minerVideo'); onOpenMinerVideo(); }}
          />
          {/* 3. Watch Mage Duel */}
          <QuestItemButton
            icon={<Image src="/app_icon.png" alt="Mage Duel" width={24} height={24} className="rounded" />}
            label="Watch Mage Duel"
            xp={75}
            completed={earnedXP.video}
            onClick={() => { onEarnXP('video'); onOpenMageDuelVideo(); }}
          />
          {/* 4. Join Discord */}
          <QuestItem
            href={LINKS.discord}
            icon={<span className="text-[#5865F2]"><DiscordIcon /></span>}
            label="Join Discord"
            xp={50}
            completed={earnedXP.discord}
            onComplete={() => onEarnXP('discord')}
          />
          {/* 5. Follow on X */}
          <QuestItem
            href={LINKS.x}
            icon={<span className="text-white"><XIcon /></span>}
            label="Follow on X"
            xp={50}
            completed={earnedXP.x}
            onComplete={() => onEarnXP('x')}
          />
        </div>
      </div>
    </motion.div>
  );
};

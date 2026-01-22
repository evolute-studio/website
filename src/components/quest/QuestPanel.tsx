'use client';

import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
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
  totalXP: number;
  lastEarnedXP: number | null;
}

export const QuestPanel = ({ isDesktop, isHydrated, collapsed, onToggle, earnedXP, onEarnXP, platform, onOpenMageDuelVideo, onOpenMinerVideo, totalXP, lastEarnedXP }: QuestPanelProps) => {
  const mageDuelLink = platform === 'ios' ? LINKS.appStore : LINKS.playStore;
  const totalQuests = 5;
  const completedQuests = Object.values(earnedXP).filter(Boolean).length;
  const remainingTasks = totalQuests - completedQuests;
  const [displayXP, setDisplayXP] = useState(0);
  const [showEarned, setShowEarned] = useState(false);
  const controls = useAnimationControls();

  // Animate XP counting up
  useEffect(() => {
    if (totalXP === 0) return;
    const duration = 400;
    const steps = 15;
    const increment = totalXP / steps;
    let current = displayXP;
    const stepTime = duration / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= totalXP) {
        setDisplayXP(totalXP);
        clearInterval(timer);
      } else {
        setDisplayXP(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [totalXP]);

  // Show earned animation
  useEffect(() => {
    if (lastEarnedXP && lastEarnedXP > 0) {
      setShowEarned(true);
      controls.start({ scale: [1, 1.05, 1] });
      const timer = setTimeout(() => setShowEarned(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [lastEarnedXP, totalXP, controls]);

  return (
    <motion.div
      className="fixed z-10 top-40 left-[4%] right-[4%] sm:top-auto sm:bottom-16 sm:left-4 sm:right-auto flex flex-col gap-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isHydrated ? 1 : 0, y: isHydrated ? 0 : 50 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* XP Counter - above quest panel */}
      <motion.div
        className="relative border-4 rounded-lg game-dialog bg-dialog-background border-dialog-border transition-[width] duration-500 ease-in-out overflow-hidden"
        style={{ width: isDesktop ? (collapsed ? QUEST_WIDTH.collapsed : QUEST_WIDTH.expanded) : 'auto' }}
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        <PixelCorner position="tl" />
        <PixelCorner position="tr" />
        <PixelCorner position="bl" />
        <PixelCorner position="br" />
        <div className="absolute inset-2 border border-yellow-500/20 rounded pointer-events-none" />
        
        <div className="relative flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">🏆</span>
            <span className="text-yellow-400 text-sm font-bold tracking-wide uppercase whitespace-nowrap">Your XP</span>
          </div>
          <motion.span 
            className="text-xl font-bold text-green-400 text-outlined whitespace-nowrap"
            key={displayXP}
          >
            {displayXP}
          </motion.span>
          
          {/* Floating +XP animation */}
          {showEarned && lastEarnedXP && (
            <motion.span
              className="absolute -top-1 right-4 text-lg font-bold text-green-400 text-outlined whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              +{lastEarnedXP}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Quest Panel */}
      <div
        className="relative border-4 rounded-lg p-4 game-dialog bg-dialog-background border-dialog-border transition-[width] duration-500 ease-in-out overflow-hidden"
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
          <span className="text-sm font-bold whitespace-nowrap text-right flex items-center gap-2">
            <span 
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{ maxWidth: collapsed ? 0 : 80, opacity: collapsed ? 0 : 1 }}
            >
              <span className="whitespace-nowrap text-yellow-400">tasks done</span>
            </span>
            <span className="shrink-0" style={{ color: remainingTasks === 0 ? '#9ca3af' : '#4ade80' }}>
              {completedQuests}/{totalQuests}
            </span>
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


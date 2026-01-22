'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LINKS, type XPKey, type EarnedXP } from '@/lib/constants';
import { usePlatform, useResponsive } from '@/hooks';
import { Logo, ActionButton, DiscordIcon, XIcon, XPBadge, HoverShine } from '@/components';
import { QuestPanel } from '@/components/quest';
import { VideoModal } from '@/components/VideoModal';

type VideoType = 'mageDuel' | 'miner' | null;

export default function Home() {
  const [showLogo, setShowLogo] = useState(false);
  const [earnedXP, setEarnedXP] = useState<EarnedXP>({ mage: false, discord: false, x: false, video: false, minerVideo: false });
  const [activeVideo, setActiveVideo] = useState<VideoType>(null);
  const platform = usePlatform();
  const { isDesktop, isHydrated, questCollapsed, setQuestCollapsed } = useResponsive();

  useEffect(() => { setShowLogo(true); }, []);

  const openVideo = (type: VideoType) => setActiveVideo(type);
  const closeVideo = () => setActiveVideo(null);

  const handleEarnXP = (key: XPKey) => {
    setEarnedXP(prev => ({ ...prev, [key]: true }));
  };

  const mageDuelLink = platform === 'ios' ? LINKS.appStore : LINKS.playStore;

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden">
      <h1 className="sr-only">Evolute Studio - Indie Mobile Games Developer</h1>
      <h2 className="sr-only">Join Our Gaming Community - Pixel Art Mobile Games</h2>

      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full z-0" role="presentation" aria-hidden="true">
        <video
          autoPlay muted loop playsInline preload="metadata" disablePictureInPicture
          poster="/poster.webp"
          className="w-full h-full object-cover video-bg"
          aria-label="Background animation"
        >
          <source src="/bg.mp4" type="video/mp4" />
          <source src="/bg.webm" type="video/webm" />
        </video>
      </div>

      <div className="fixed top-0 left-0 w-full h-64 z-5 pointer-events-none bg-[image:var(--color-overlay-gradient)]" />

      {/* Logo */}
      {showLogo && (
        <>
          <Logo isMobile={true} />
          <Logo isMobile={false} />
        </>
      )}

      {/* Action Buttons */}
      <motion.div
        className="fixed bottom-6 sm:bottom-16 left-1/2 -translate-x-1/2 z-10 w-[92%] sm:w-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex flex-col gap-3 sm:gap-4 items-center w-full sm:w-auto">
          {/* Play Mage Duel */}
          <div className="relative group w-full sm:w-auto">
            <motion.a
              href={mageDuelLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Play Mage Duel - Download from App Store or Google Play"
              className="relative text-white font-bold pl-0 pr-4 sm:pr-6 py-4 sm:py-0 text-base text-center game-btn text-outlined block bg-btn-primary overflow-hidden w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleEarnXP('mage')}
              onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); handleEarnXP('mage'); window.open(mageDuelLink, '_blank'); } }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3 w-full">
                <Image src="/app_icon.png" alt="Mage Duel" width={44} height={44} priority className="rounded-l absolute left-0 sm:relative" />
                <span>Play Mage Duel</span>
              </span>
              <HoverShine />
            </motion.a>
            <XPBadge xp={100} earned={earnedXP.mage} />
          </div>

          {/* Discord & X */}
          <div className="flex flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <ActionButton
              href={LINKS.discord}
              icon={<DiscordIcon />}
              label="Join Discord"
              mobileLabel="Discord"
              xp={50}
              earned={earnedXP.discord}
              onEarn={() => handleEarnXP('discord')}
              className="flex-1 sm:flex-none"
            />
            <ActionButton
              href={LINKS.x}
              icon={<XIcon />}
              label="Follow on X"
              xp={50}
              earned={earnedXP.x}
              onEarn={() => handleEarnXP('x')}
              className="flex-1 sm:flex-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Quest Panel */}
      <QuestPanel
        isDesktop={isDesktop}
        isHydrated={isHydrated}
        collapsed={questCollapsed}
        onToggle={() => setQuestCollapsed(!questCollapsed)}
        earnedXP={earnedXP}
        onEarnXP={handleEarnXP}
        platform={platform}
        onOpenMageDuelVideo={() => openVideo('mageDuel')}
        onOpenMinerVideo={() => openVideo('miner')}
      />

      {/* Video Modals */}
      <VideoModal
        isOpen={activeVideo === 'mageDuel'}
        onClose={closeVideo}
        videoUrl={LINKS.youtubeMageDuel}
        title="Watch Mage Duel"
      />
      <VideoModal
        isOpen={activeVideo === 'miner'}
        onClose={closeVideo}
        videoUrl={LINKS.youtubeMiner}
        title="Watch Miner Demo"
      />
    </main>
  );
}

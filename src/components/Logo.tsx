'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  isMobile: boolean;
}

export const Logo = ({ isMobile }: LogoProps) => {
  const config = isMobile
    ? { 
        textClass: 'text-[9vw]', 
        imgSize: 80, 
        imgClass: 'w-[18vw] h-[18vw] max-w-[80px] max-h-[80px]', 
        subtitleClass: 'text-[4.5vw] -mt-2', 
        containerClass: 'fixed top-6 left-1/2 -translate-x-1/2 z-10 sm:hidden flex flex-col items-center w-full', 
        gap: 'gap-3' 
      }
    : { 
        textClass: 'text-6xl', 
        imgSize: 150, 
        imgClass: '', 
        subtitleClass: 'text-2xl -mt-3', 
        containerClass: 'hidden sm:flex fixed top-8 left-1/2 transform -translate-x-1/2 z-10 flex-col items-center w-full', 
        gap: 'gap-1' 
      };

  return (
    <motion.div
      className={config.containerClass}
      initial={{ opacity: 0, scale: isMobile ? 0.8 : 0.7, y: isMobile ? -30 : -40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.8 : 0.9, ease: [0.34, 1.56, 0.64, 1], opacity: { duration: isMobile ? 0.4 : 0.5 } }}
    >
      <motion.div
        initial={{ filter: `blur(${isMobile ? 10 : 12}px) brightness(${isMobile ? 2 : 2.5})` }}
        animate={{ filter: "blur(0px) brightness(1)" }}
        transition={{ duration: isMobile ? 0.6 : 0.7, delay: isMobile ? 0.2 : 0.15 }}
        className={`flex items-center ${config.gap}`}
      >
        <span className={`text-white ${config.textClass} font-semibold text-outlined tracking-wide`}>Evolute</span>
        <Image 
          src="/small.svg" 
          alt="Evolute Studio Logo" 
          width={config.imgSize} 
          height={config.imgSize} 
          priority
          className={`pixel-art [filter:var(--filter-logo-glow)] ${config.imgClass}`} 
        />
        <span className={`text-white ${config.textClass} font-semibold text-outlined tracking-wide`}>Studio</span>
      </motion.div>
      <motion.div
        className={`text-white ${config.subtitleClass} text-outlined font-bold tracking-wide text-center`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        We&apos;re making mobile games. Join Us!
      </motion.div>
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)" }}
        />
      )}
    </motion.div>
  );
};

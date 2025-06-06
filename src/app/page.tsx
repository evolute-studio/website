'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayText}</span>;
};

export default function Home() {
  const [showLogoDialog, setShowLogoDialog] = useState(false);
  const [showMainDialog, setShowMainDialog] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogoDialog(true);
    }, 0);

    const mainTimer = setTimeout(() => {
      setShowMainDialog(true);
    }, 1000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          x-webkit-airplay="deny"
          className="w-full h-full object-cover video-bg"
          onLoadStart={() => {
            if (typeof window !== 'undefined') {
              const video = document.querySelector('video');
              if (video) {
                video.play().catch(() => { });
              }
            }
          }}
        >
          <source src="/bg.mp4" type="video/mp4" />
          <source src="/bg.webm" type="video/webm" />
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800" />
        </video>
      </div>


      <div className="fixed top-0 left-0 w-full h-64 z-5 pointer-events-none bg-[image:var(--color-overlay-gradient)]"></div>

      {showLogoDialog && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-full z-10 p-4 sm:hidden -mt-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src="/square-logo.svg"
              alt="Evolute Studio Logo"
              width={650}
              height={100}
              className="pixel-art w-full h-auto max-w-70 mx-auto [filter:var(--filter-logo-glow)]"
            />
          </motion.div>

          <motion.div
            className="hidden sm:block fixed top-8 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src="/wide.svg"
              alt="Evolute Studio Logo"
              width={700}
              height={100}
              className="pixel-art h-auto [filter:var(--filter-logo-glow)]"
            />
          </motion.div>
        </>
      )}

      {showMainDialog && (
        <motion.div
          className="fixed bottom-0 left-0 w-full sm:top-3/4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-10 sm:px-4"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="border-0 border-t-4 sm:border-4 rounded-none sm:rounded-lg p-6 pb-12 md:pb-6 sm:p-8 w-full sm:w-[500px] pixel-dialog-shadow bg-dialog-background/60 border-dialog-border">
            <div className="text-white text-lg sm:text-xl leading-relaxed mb-4 sm:mb-6 text-center text-outlined font-bold">
              <TypewriterText
                text="We're making on-chain games. Join Us!"
                onComplete={() => setShowLinks(true)}
              />
            </div>

            {showLinks && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <motion.a
                    href="https://discord.gg/s7XXRGRwVw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base transition-all duration-200 text-center pixel-btn text-outlined block bg-btn-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  >
                    Join Discord
                  </motion.a>
                  <motion.a
                    href="https://x.com/evolute_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base transition-all duration-200 text-center pixel-btn text-outlined block bg-btn-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  >
                    Follow on X
                  </motion.a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
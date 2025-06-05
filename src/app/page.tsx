'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    }, 1000);

    const mainTimer = setTimeout(() => {
      setShowMainDialog(true);
    }, 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fullscreen animated background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src="/bg.webp"
          alt="Animated background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>


      {/* Top gradient overlay for readability */}
      <div
        className="fixed top-0 left-0 w-full h-64 z-5 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
        }}
      ></div>

      {/* Logo - Clean floating logo */}
      {showLogoDialog && (
        <>
          {/* Mobile Logo */}
          <div className="fixed top-0 left-0 w-full z-10 animate-slideIn p-4 sm:hidden -mt-10">
            <Image
              src="/square-logo.svg"
              alt="Evolute Studio Logo"
              width={650}
              height={100}
              className="pixel-art w-full h-auto"
              style={{
                filter: 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
              }}
            />
          </div>

          {/* Desktop Logo */}
          <div className="hidden sm:block fixed top-8 left-1/2 transform -translate-x-1/2 z-10 animate-slideIn">
            <Image
              src="/wide.svg"
              alt="Evolute Studio Logo"
              width={700}
              height={100}
              className="pixel-art h-auto"
              style={{
                filter: 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
              }}
            />
          </div>
        </>
      )}

      {/* Main Dialog - Bottom Center */}
      {showMainDialog && (
        <div className="fixed bottom-0 left-0 w-full sm:top-3/4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-10 sm:px-4">
          <div className="border-0 border-t-4 sm:border-4 rounded-none sm:rounded-lg p-6 pb-12 md:pb-6 sm:p-8 w-full sm:w-[500px] pixel-dialog-shadow animate-slideInUp sm:animate-slideIn" style={{ backgroundColor: 'rgba(43, 44, 69, 0.85)', borderColor: '#A47552' }}>
            {/* Typewriter text */}
            <div className="text-white text-lg sm:text-xl leading-relaxed mb-4 sm:mb-6 text-center text-outlined font-bold">
              <TypewriterText
                text="We're making on-chain games. Join Us!"
                onComplete={() => setShowLinks(true)}
              />
            </div>

            {/* Links */}
            <div className={`overflow-hidden transition-all duration-500 ease-out sm:transition-none ${showLinks ? 'max-h-40 mt-4 sm:max-h-none sm:mt-4' : 'max-h-0 mt-0 sm:max-h-0 sm:mt-0'}`}>
              <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center ${showLinks ? 'sm:animate-fadeIn' : ''}`}>
                <a
                  href="https://discord.gg/s7XXRGRwVw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base transition-all duration-200 text-center pixel-btn text-outlined block"
                  style={{ backgroundColor: '#A47552' }}
                >
                  Join Discord
                </a>
                <a
                  href="https://x.com/evolute_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base transition-all duration-200 text-center pixel-btn text-outlined block"
                  style={{ backgroundColor: '#A47552' }}
                >
                  Follow on X
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
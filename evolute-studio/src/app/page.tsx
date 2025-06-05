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
        />
      </div>


      {/* Logo - Floating game banner style */}
      {showLogoDialog && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-10 animate-slideIn">
          <div className="relative">
            {/* Banner background with dialog color scheme */}
            <div
              className="transform -skew-x-12 border-4"
              style={{
                backgroundColor: '#2B2C45',
                borderColor: '#A47552',
                boxShadow: '6px 6px 0px #7A5939, 8px 8px 0px #5A4129, inset 0 2px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.3)'
              }}
            >
              <div className="transform skew-x-12">
                <Image
                  src="/wide.svg"
                  alt="Evolute Studio Logo"
                  width={420}
                  height={100}
                  className="pixel-art filter brightness-110"
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Main Dialog - Bottom Center */}
      {showMainDialog && (
        <div className="fixed top-3/4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="border-4 rounded-lg p-8 w-[500px] pixel-dialog-shadow animate-slideIn" style={{ backgroundColor: '#2B2C45', borderColor: '#A47552' }}>
            {/* Typewriter text */}
            <div className="text-white text-xl leading-relaxed mb-6 text-center text-outlined font-bold">
              <TypewriterText
                text="We're making  games. Join Us!"
                onComplete={() => setShowLinks(true)}
              />
            </div>

            {/* Links */}
            {showLinks && (
              <div className="flex gap-4 animate-fadeIn justify-center">
                <a
                  href="https://discord.gg/s7XXRGRwVw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold py-3 px-6 transition-all duration-200 text-center pixel-btn text-outlined block"
                  style={{ backgroundColor: '#A47552' }}
                >
                  Join Discord
                </a>
                <a
                  href="https://x.com/evolute_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold py-3 px-6 transition-all duration-200 text-center pixel-btn text-outlined block"
                  style={{ backgroundColor: '#A47552' }}
                >
                  Follow on X
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
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


      {/* Logo Dialog - Top Center */}
      {showLogoDialog && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="border-4 rounded-lg pixel-dialog-shadow animate-slideIn" style={{ backgroundColor: '#2B2C45', borderColor: '#A47552' }}>
            <div className="flex justify-center">
              <Image
                src="/wide.svg"
                alt="Evolute Studio Logo"
                width={400}
                height={200}
                className="pixel-art"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Dialog - Bottom Center */}
      {showMainDialog && (
        <div className="fixed top-2/3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="border-4 rounded-lg p-8 max-w-md pixel-dialog-shadow animate-slideIn" style={{ backgroundColor: '#2B2C45', borderColor: '#A47552' }}>
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
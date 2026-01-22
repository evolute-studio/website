import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Return to Evolute Studio homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="text-center">
        {/* Pixel art style 404 */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold text-white text-outlined tracking-wider">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="pixel-dialog-shadow bg-dialog-background/90 border-4 border-dialog-border rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-outlined mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            Oops! The page you&apos;re looking for seems to have wandered off into the void.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="text-white font-bold py-3 px-6 text-base transition-all duration-200 text-center pixel-btn text-outlined block bg-btn-primary hover:scale-105"
            >
              Return Home
            </a>
            <a
              href="https://discord.gg/s7XXRGRwVw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold py-3 px-6 text-base transition-all duration-200 text-center pixel-btn text-outlined block bg-btn-primary hover:scale-105"
            >
              Get Help on Discord
            </a>
          </div>
        </div>

        {/* Additional helpful links */}
        <div className="mt-8 text-gray-400">
          <p className="mb-2">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="https://x.com/evolute_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline"
            >
              Follow us on X
            </a>
            <span>•</span>
            <a
              href="https://discord.gg/s7XXRGRwVw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline"
            >
              Join our Discord
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

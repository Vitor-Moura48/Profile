import "./globals.css";
import { Metadata } from "next";
import { LanguageProvider } from "../context/LanguageContext";
import { metadata as metadataConfig } from "../lib/metadata";
import { ScrollToTop } from "../components/scrollToTop";

export const metadata: Metadata = {
  title: {
    default: metadataConfig.DEFAULT.title,
    template: "%s | " + metadataConfig.DEFAULT.title,
  },
  description: metadataConfig.DEFAULT.description,
  openGraph: {
    title: metadataConfig.DEFAULT.title,
    description: metadataConfig.DEFAULT.description,
    url: metadataConfig.DEFAULT.url,
    siteName: metadataConfig.DEFAULT.title,
    images: [
      {
        url: metadataConfig.DEFAULT.ogImage,
        width: 1920,
        height: 1080,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: metadataConfig.DEFAULT.title,
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
  metadataBase: new URL(metadataConfig.DEFAULT.url),
};

import { ParticlesBackground } from "../components/particlesBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>

      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        <LanguageProvider>
            <ParticlesBackground />
            <ScrollToTop />
            <div className="relative z-10 w-full min-h-screen">
              {children}
            </div>
          </LanguageProvider>
      </body>
    </html>
  );
}
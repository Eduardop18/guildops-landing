import './globals.css';
import type { Metadata, Viewport } from 'next';
import { I18nProvider } from '@/lib/i18n/context';
import { LanguageSwitcher } from '@/components/language-switcher';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0E1A',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://guildops.gg'),
  title: 'GuildOps - The Command Center for Your Mythic Guild | WoW Guild Management',
  description: 'Stop juggling Discord, spreadsheets, and WarcraftLogs. GuildOps is the all-in-one guild management platform built for Mythic raiding guilds. Roster health, raid planning, attendance tracking & more.',
  keywords: 'WoW guild management, World of Warcraft, Mythic raiding, guild tools, raid planner, WarcraftLogs integration, Discord alerts, roster management, attendance tracking',
  authors: [{ name: 'GuildOps' }],
  creator: 'GuildOps',
  publisher: 'GuildOps',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'GuildOps',
    title: 'GuildOps - The Command Center for Your Mythic Guild',
    description: 'All-in-one guild management platform for Mythic raiding guilds. Roster health, raid planning, WarcraftLogs integration & Discord alerts.',
    images: [
      {
        url: '/images/dashboard-mockup.png',
        width: 1200,
        height: 630,
        alt: 'GuildOps Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GuildOps - The Command Center for Your Mythic Guild',
    description: 'All-in-one guild management for Mythic raiding guilds.',
    images: ['/images/dashboard-mockup.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" async />
        {/* JSON-LD Schema for SaaS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'GuildOps',
              applicationCategory: 'GameApplication',
              operatingSystem: 'Web',
              description: 'Guild management platform for World of Warcraft Mythic raiding guilds',
              offers: {
                '@type': 'AggregateOffer',
                lowPrice: '0',
                highPrice: '39',
                priceCurrency: 'USD',
                offerCount: '3',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '2500',
              },
              featureList: [
                'Roster Health Dashboard',
                'Raid Planner',
                'WarcraftLogs Integration',
                'Discord Alerts',
                'Attendance Tracking',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <I18nProvider>
          <LanguageSwitcher />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

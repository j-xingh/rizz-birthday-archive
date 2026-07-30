import type { Metadata } from 'next';
import { Cinzel_Decorative, Cormorant_Garamond, Caveat } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-signature',
});

export const metadata: Metadata = {
  title: "Rizz's Birthday Archive",
  description: 'A gothic birthday surprise made with love.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${cormorant.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
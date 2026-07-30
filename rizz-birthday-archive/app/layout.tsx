import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: "Rizz's Birthday Archive", description: 'A birthday surprise made for Rizz.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

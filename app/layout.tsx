import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MeetOS - Book Smarter. Powered by AI.',
  description: 'Complete AI Scheduling Ecosystem for modern ambitious teams and leaders. Book meetings without back-and-forth.',
  keywords: ['AI Calendar', 'Scheduling Software', 'MeetOS', 'State AI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrumentSerif.variable} scroll-smooth`}>
      <body className="bg-[#f5f5f7] text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}

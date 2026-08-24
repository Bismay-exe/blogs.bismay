import type { Metadata } from "next";
import { Inter, Inter_Tight, Lora, JetBrains_Mono, Space_Mono, DM_Sans, DM_Mono, Roboto } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReaderSettingsClientProvider } from "@/components/providers/ReaderSettingsClientProvider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Blogs by Bismay",
  description: "Personal tech blog & reading experience by Bismay",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        dmSans.variable,
        dmMono.variable,
        lora.variable,
        roboto.variable,
        jetbrainsMono.variable,
        spaceMono.variable,
        inter.variable,
        interTight.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <ReaderSettingsClientProvider>
          <SmoothScroll root>
            {children}
          </SmoothScroll>
        </ReaderSettingsClientProvider>
      </body>
    </html>
  );
}

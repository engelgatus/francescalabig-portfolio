import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroller from "@/components/animations/SmoothScroller";
import "./globals.css";

// --- FONTS ---
const displayFont = localFont({
  src: "../public/fonts/display/love-signal.otf",
  variable: "--font-display",
  display: "swap",
});

// Future: Import primaryFont and secondaryFont here

export const metadata: Metadata = {
  title: "Frances Calabig | Virtual Assistant",
  description: "Experienced virtual assistant specializing in email management, HR administration, customer service, and social media management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Inject font variable into the HTML tag */}
      <body className={`${displayFont.variable} antialiased`}>
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}

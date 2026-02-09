import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroller from "@/components/animations/SmoothScroller";
import "./globals.css";

// --- FONTS ---

// Display: Love Signal (Headings)
const displayFont = localFont({
  src: "../public/fonts/display/disney.otf",
  variable: "--font-display",
  display: "swap",
});

// Primary: Gain Better (Body/UI)
const primaryFont = localFont({
  src: "../public/fonts/primary/gain-better.otf",
  variable: "--font-primary",
  display: "swap",
});

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
      <body className={`${displayFont.variable} ${primaryFont.variable} antialiased font-sans`}>
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import SmoothScroller from "@/components/animations/SmoothScroller"; // Import the new component
import "./globals.css";

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
      <body className="antialiased">
        <SmoothScroller>
            {children}
        </SmoothScroller>
      </body>
    </html>
  );
}

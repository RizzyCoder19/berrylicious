import type { Metadata, Viewport } from "next";
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { TransitionProvider } from "@/components/navigation/transition-provider";
import { CustomerHelp } from "@/components/customer-support/customer-help";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Berrylicious — Desserts, Coffee & Good Vibes",
  description:
    "Discover Berrylicious — playful desserts, fruit-forward flavours, gelato and indulgent treats made to turn ordinary moments into something sweeter.",
  keywords: [
    "Berrylicious",
    "dessert startup",
    "real fruit dessert",
    "gelato",
    "waffles",
    "mini pancakes",
    "Shark Tank",
    "Tanvi Ojha",
  ],
  authors: [{ name: "Tanvi Ojha", url: "https://berrylicious.in" }],
  openGraph: {
    title: "Berrylicious — Desserts, Coffee & Good Vibes",
    description:
      "Discover Berrylicious — playful desserts, fruit-forward flavours, gelato and indulgent treats made to turn ordinary moments into something sweeter.",
    siteName: "Berrylicious",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#E98FA8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveat.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FFF9F0] text-[#382D32] antialiased selection:bg-[#E98FA8] selection:text-[#382D32]">
        <TransitionProvider>
          <Navbar />
          {children}
          <CustomerHelp />
        </TransitionProvider>
      </body>
    </html>
  );
}

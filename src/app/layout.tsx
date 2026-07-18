import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./site-config";
import SiteAnalytics from "@/components/site-analytics";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meccha Chameleon | Unofficial Field Guide",
    template: "%s",
  },
  description:
    "A practical unofficial field guide for Meccha Chameleon hiders, seekers, maps, and camouflage tactics.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Meccha Chameleon Field Manual",
    title: "Meccha Chameleon | Unofficial Field Guide",
    description:
      "Complete hider, seeker, map, camouflage, and troubleshooting field files with source notes.",
    url: "/",
    images: [
      {
        url: "/media/game/promo-poster.webp",
        alt: "Meccha Chameleon gameplay field guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meccha Chameleon | Unofficial Field Guide",
    description:
      "Complete hider, seeker, map, camouflage, and troubleshooting field files with source notes.",
    images: ["/media/game/promo-poster.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}

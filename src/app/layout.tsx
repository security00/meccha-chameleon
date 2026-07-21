import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./site-config";
import AnalyticsConsent from "@/components/analytics-consent";
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

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

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
  ...(googleVerification || bingVerification
    ? {
        verification: {
          google: googleVerification,
          other: bingVerification ? { "msvalidate.01": bingVerification } : undefined,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Meccha Chameleon Field Manual",
    alternateName: "Meccha Chameleon Unofficial Field Guide",
    url: SITE_URL,
    description:
      "An independent field guide for Meccha Chameleon roles, maps, camouflage, and troubleshooting.",
  };

  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <SiteAnalytics />
        <AnalyticsConsent />
      </body>
    </html>
  );
}

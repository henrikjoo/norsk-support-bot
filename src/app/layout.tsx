import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kundeservicenorge.no"),
  title: {
    default: "Kundeservice Norge – AI-kundeservice for norske nettbutikker",
    template: "%s | Kundeservice Norge",
  },
  description:
    "AI-kundeservice for norske nettbutikker. Svar kundene dine automatisk, 24/7, basert på din egen FAQ og policy. 14 dager gratis prøveperiode.",
  openGraph: {
    title: "Kundeservice Norge – AI-kundeservice for norske nettbutikker",
    description: "AI-kundeservice for norske nettbutikker. 14 dager gratis prøveperiode.",
    url: "https://kundeservicenorge.no",
    siteName: "Kundeservice Norge",
    locale: "nb_NO",
    type: "website",
  },
};

const strukturertData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kundeservice Norge",
  url: "https://kundeservicenorge.no",
  logo: "https://kundeservicenorge.no/icon.svg",
  description: "AI-kundeservice for norske nettbutikker.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturertData) }}
        />
      </body>
    </html>
  );
}

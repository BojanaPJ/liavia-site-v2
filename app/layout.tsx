import type { Metadata } from "next";
import "./globals.css";
import Header from "./Components/Layouts/Header";
import GlobalDotCanvas from "./Components/DotsCanvas";
import Footer from "./Components/Layouts/Footer";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "./fonts/RecoletaRegular.woff",
  variable: "--font-heading",
  display: "swap",
});

const primaryFont = localFont({
  src: "./fonts/NHaasGroteskTXPro-65Md.woff",
  variable: "--font-primary",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "LiaVia - Organizational Intelligence for Execution Momentum | Momentum. By Design.",
  description:
    "Strategy sets direction. Execution sets trajectory. LiaVia maps your true delivery capacity so your momentum compounds, not dissipates.",
  metadataBase: new URL("https://liavia.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "LiaVia - Organizational Intelligence for Execution Momentum | Momentum. By Design.",
    description:
      "Strategy sets direction. Execution sets trajectory. LiaVia maps your true delivery capacity so your momentum compounds, not dissipates.",
    url: "https://liavia.ai",
    siteName: "LiaVia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "LiaVia - Organizational Intelligence for Execution Momentum | Momentum. By Design.",
    description:
      "Strategy sets direction. Execution sets trajectory. LiaVia maps your true delivery capacity so your momentum compounds, not dissipates.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${primaryFont.variable} ${headingFont.variable}  `}>
        <Header />
        {/* <GlobalDotCanvas /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}

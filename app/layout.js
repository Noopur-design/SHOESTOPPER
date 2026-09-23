import "./globals.css";
import { Manrope, Syne, Fraunces } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import ClickSpark from "@/components/reactbits/ClickSpark";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata = {
  title: {
    default: "ShoeStopper — Step Into Something Legendary",
    template: "%s · ShoeStopper",
  },
  description:
    "ShoeStopper is a premium sneaker and footwear store. Shop running, basketball, hiking, and street styles with fast, free shipping.",
  keywords: ["shoes", "sneakers", "running shoes", "basketball shoes", "ShoeStopper"],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${syne.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen bg-bg text-fg antialiased">
        <Providers>
          <ClickSpark />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

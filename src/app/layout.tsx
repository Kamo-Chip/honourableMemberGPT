import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import type { Metadata } from "next";
import "./globals.css";
import ogImage from "./opengraph-image.png";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://honourable-member-gpt.vercel.app"),
  title: "HonourableMemberGPT",
  description:
    "An AI chatbot that makes you an informed citizen by giving you the TLDR of political party manifestos",
  openGraph: {
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
        <Analytics />
      </body>
    </html>
  );
}

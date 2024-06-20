import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import type { Metadata } from "next";
import "./globals.css";
import ogImage from "./opengraph-image.png";

export const metadata: Metadata = {
  title: "HonourableMemberGPT",
  description:
    "An AI chatbot that makes you an informed citizen by giving you the TLDR of political party manifestos",
  viewport: "width=device-width, initial-scale=1.0",
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
      </body>
    </html>
  );
}

import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HonourableMemberGPT",
  description:
    "An AI chatbot that makes you an informed citizen by giving you the TLDR of political party manifestos",
  viewport: "width=device-width, initial-scale=1.0",
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

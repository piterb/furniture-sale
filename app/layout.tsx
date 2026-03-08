import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Weeze Home Collection",
  description: "Private furniture sale catalog with reservation flow"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

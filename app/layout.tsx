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
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d648bcd7-6369-4812-9923-69ffbd8ac819"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

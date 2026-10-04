import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OmniServe",
  description: "Real-Time AI Support Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

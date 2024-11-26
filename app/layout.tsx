import type { Metadata } from "next";
import "../styles/globals.css";
import FontLoader from "@/components/layout/FontLoader";
import Home from "./page";

export const metadata: Metadata = {
  title: "Ballot for collaborators",
  description: "Ballot for collaborators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FontLoader />
        <Home>
          {children}
        </Home>
      </body>
    </html>
  );
}

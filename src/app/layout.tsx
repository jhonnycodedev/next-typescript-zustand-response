// ./layout.tsx

import type {Metadata} from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Profiles",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>){

  return (
    <html lang="pt-br">
      <body className="relative">
        <header className="container w-full  px-4 justify-between"></header>
        <main className="flex min-h-screen flex-col bg-tertiary">{children}</main>
    </body>
   </html>
  );
}
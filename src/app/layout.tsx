import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold">VibeVault</Link>
            <nav className="text-sm space-x-4">
              <Link href="/">Home</Link>
              <Link href="/api/auth/signin">Sign in</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

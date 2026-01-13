import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

/* ===============================
   SEO + Google Search Console
================================ */
export const metadata: Metadata = {
  title: "Roomly – Find Rooms in Berlin",
  description:
    "Roomly helps you find rooms and shared apartments for rent in Berlin easily and quickly.",
  verification: {
    google: "7XY4QFlcbO13HsbJ3M-4Pl1l9A4Pbbe-GltnYncvINA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">

        {/* ================= Header ================= */}
        <header className="bg-white shadow-md border-b">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-green-600">
              Roomly
            </Link>

            <nav className="space-x-6 text-sm font-medium">
              <Link href="/listings" className="text-gray-700 hover:text-green-600">
                Listings
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600">
                Contact
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-700 hover:text-green-600"
              >
                Privacy
              </Link>
            </nav>
          </div>
        </header>

        {/* ================= Main Content ================= */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </main>

        {/* ================= Footer ================= */}
        <footer className="bg-gray-900 text-gray-300 mt-16">
          <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-center">
            © {new Date().getFullYear()} Roomly – Find rooms in Berlin
          </div>
        </footer>

      </body>
    </html>
  );
}

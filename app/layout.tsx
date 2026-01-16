import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Script from "next/script";


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

      {/* ================= Google Analytics ================= */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-CYEDYKQPRJ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CYEDYKQPRJ');
        `}
      </Script>
      {/* ==================================================== */}

      <body className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">

        {/* ================= Header ================= */}
        <header className="bg-white shadow-md border-b">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Roomly Logo"
                width={36}
                height={36}
                priority
              />
              <span className="text-2xl font-bold text-green-600">
                Roomly
              </span>
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

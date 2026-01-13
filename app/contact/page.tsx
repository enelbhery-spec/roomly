import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Roomly",
  description:
    "Contact Roomly for questions about room and apartment listings in Berlin.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">

        <h1 className="text-3xl font-bold mb-4 text-center">
          Contact Us
        </h1>

        <p className="text-gray-600 text-center mb-8">
          If you have any questions about our listings or need more information,
          feel free to get in touch with us.
        </p>

        <div className="space-y-4 text-center text-gray-700">
          <p>
            📧 <strong>Email:</strong> contact@roomly.com
          </p>
          <p>
            🌍 <strong>Location:</strong> Berlin, Germany
          </p>
          <p>
            🕒 <strong>Response Time:</strong> Within 24–48 hours
          </p>
        </div>

      </div>
    </main>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = createClient();

  const { data: rooms } = await supabase
    .from("rooms")
    .select("id, title, price")
    .order("created_at", { ascending: false })
    .limit(6); // نعرض أحدث 6 فقط

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Roomly</h1>
          <p className="text-gray-600 mt-2">
            Publish your room or shared apartment for rent in Berlin – for free
          </p>
        </header>

        {/* CTA */}
        <section className="mb-8 bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">
            Have a room to rent?
          </h2>
          <p className="text-gray-600 mb-4">
            Add your listing and reach people looking for rooms in Berlin.
          </p>
          <Link
            href="/add-listing"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded"
          >
            Add your listing
          </Link>
        </section>

        {/* Latest Listings */}
        <section className="space-y-4">
          {rooms && rooms.length === 0 && (
            <p className="text-gray-500">No rooms available right now.</p>
          )}

          {rooms?.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="block bg-white p-4 rounded shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg">{room.title}</h2>
              <p className="text-gray-600">€{room.price} / month</p>
            </Link>
          ))}
        </section>

        {/* View more */}
        <div className="mt-8 text-center">
          <Link
            href="/listings"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            View more rooms
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center">
          <Link href="/how-it-works" className="text-green-700 underline">
            How Roomly works
          </Link>
        </footer>

      </div>
    </main>
  );
}

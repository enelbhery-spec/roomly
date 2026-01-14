import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createClient();

  const { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (!room || error) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">

        <h1 className="text-3xl font-bold mb-4">
          {room.title}
        </h1>

        <p className="text-green-600 text-xl font-semibold mb-4">
          €{room.price} / month
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {room.description}
        </p>

        {/* محتوى إضافي للثقة و SEO */}
        <section className="space-y-3 text-gray-600 text-sm">
          <p>
            Located in {room.location}, with easy access to public transport,
            shops, and daily services.
          </p>

          <p>
            Ideal for students, professionals, and newcomers to Berlin.
          </p>

          <p>
            Early booking is recommended due to high demand.
          </p>
        </section>

      </div>
    </main>
  );
}

import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

type RoomPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RoomDetailsPage({ params }: RoomPageProps) {
  const { id } = await params;

  const supabase = createClient();

  const { data: room, error } = await supabase
    .from("rooms")
    .select(`
      id,
      title,
      description,
      price,
      currency,
      room_type,
      phone,
      facebook_url,
      images
    `)
    .eq("id", id)
    .single();

  if (error || !room) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Room not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <Link
          href="/listings"
          className="text-green-700 underline mb-4 inline-block"
        >
          ← Back to listings
        </Link>

        <h1 className="text-2xl font-bold mb-2">{room.title}</h1>

        <p className="text-gray-600 mb-4">
          {room.currency ?? "EUR"} {room.price} / month
        </p>

        {/* Images */}
        {room.images && room.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {room.images.map((img: string, index: number) => {
              const imageUrl = supabase.storage
                .from("rooms")
                .getPublicUrl(img).data.publicUrl;

              return (
                <div key={index} className="relative h-48 rounded overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={room.title}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Description */}
        {room.description && (
          <p className="text-gray-700 mb-6">{room.description}</p>
        )}

        {/* Type */}
        {room.room_type && (
          <p className="mb-4">
            <strong>Type:</strong>{" "}
            {room.room_type === "room" ? "Room" : "Shared Apartment"}
          </p>
        )}

        {/* Contact Section */}
        <div className="mt-6 space-y-3">
          {room.phone && (
            <p className="text-lg font-semibold text-green-700">
              📞 {room.phone}
            </p>
          )}

          {room.facebook_url && (
            <a
              href={room.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              💬 Contact via Facebook
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

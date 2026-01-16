"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Listing = {
  id: string;
  title: string;
  price: number;
  currency: string | null;
  room_type: string | null;
  phone: string | null;
  facebook_url: string | null;
  images?: string[] | null;
};

export default function ListingsPage() {
  const supabase = createClient();

  const [listings, setListings] = useState<Listing[]>([]);
  const [type, setType] = useState<"all" | "room" | "shared">("all");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await supabase
        .from("rooms")
        .select(
          "id, title, price, currency, room_type, phone, facebook_url, images"
        )
        .order("created_at", { ascending: false });

      if (data) setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter((item) => {
    const matchType = type === "all" || item.room_type === type;
    const matchPrice = item.price <= maxPrice;
    return matchType && matchPrice;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Roomly</h1>
        <p className="text-gray-600 mb-6">
          Find rooms and shared apartments in Berlin
        </p>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            className="border p-2 rounded w-1/2"
            value={type}
            onChange={(e) =>
              setType(e.target.value as "all" | "room" | "shared")
            }
          >
            <option value="all">All types</option>
            <option value="room">Room</option>
            <option value="shared">Shared Apartment</option>
          </select>

          <select
            className="border p-2 rounded w-1/2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          >
            <option value={600}>Max €600</option>
            <option value={700}>Max €700</option>
            <option value={2000}>Max 2000</option>
          </select>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && filteredListings.length === 0 && (
          <p className="text-gray-600">No results found.</p>
        )}

        <div className="space-y-4">
          {filteredListings.map((item) => {
            const image =
              item.images && item.images.length > 0
                ? supabase.storage
                    .from("rooms")
                    .getPublicUrl(item.images[0]).data.publicUrl
                : null;

            return (
              <div
                key={item.id}
                className="flex gap-4 bg-white p-4 rounded shadow hover:shadow-md transition"
              >
                {/* Image */}
                <Link href={`/rooms/${item.id}`}>
                  <div className="relative w-32 h-24 bg-gray-200 rounded overflow-hidden">
                    {image && (
                      <Image
                        src={image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1">
                  <Link href={`/rooms/${item.id}`}>
                    <h2 className="font-semibold text-lg hover:underline">
                      {item.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600">
                    {item.currency ?? "EUR"} {item.price} / month
                  </p>

                  {/* Contact */}
                  {item.phone && (
                    <p className="text-sm text-green-700 font-medium mt-1">
                      📞 {item.phone}
                    </p>
                  )}

                  {!item.phone && item.facebook_url && (
                    <a
                      href={item.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      💬 Contact via Facebook
                    </a>
                  )}

                  {item.room_type && (
                    <span className="inline-block mt-2 ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.room_type === "room"
                        ? "Room"
                        : "Shared Apartment"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Listing = {
  id: string;
  title: string;
  price: number;
  type: "room" | "shared";
};

export default function ListingsPage() {
  const supabase = createClient();

  const [listings, setListings] = useState<Listing[]>([]);
  const [type, setType] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("id, title, price, type")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setListings(data);
      }

      setLoading(false);
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter((item) => {
    const matchType = type === "all" || item.type === type;
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
            onChange={(e) => setType(e.target.value)}
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
            <option value={500}>Max €500</option>
            <option value={700}>Max €700</option>
            <option value={1000}>Max €1000</option>
          </select>
        </div>

        {/* Results */}
        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && filteredListings.length === 0 && (
          <p className="text-gray-500">No results found.</p>
        )}

        <div className="space-y-4">
          {filteredListings.map((item) => (
            <Link
              key={item.id}
              href={`/rooms/${item.id}`}
              className="block bg-white p-4 rounded shadow hover:shadow-md"
            >
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-green-600">€{item.price} / month</p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

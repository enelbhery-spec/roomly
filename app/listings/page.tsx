"use client";

import { useState } from "react";
import Link from "next/link";

const listings = [
  {
    id: "1",
    title: "Room in Neukölln",
    price: 450,
    type: "room",
  },
  {
    id: "2",
    title: "Shared apartment in Kreuzberg",
    price: 600,
    type: "shared",
  },
];

export default function ListingsPage() {
  const [type, setType] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);

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
        <div className="space-y-4">
          {filteredListings.length === 0 && (
            <p className="text-gray-500">
              No results found.
            </p>
          )}

          {filteredListings.map((item) => (
            <Link
              key={item.id}
              href={`/listings/${item.id}`}
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

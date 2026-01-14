"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RoomDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const supabase = createClient();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoom() {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setRoom(null);
      } else {
        setRoom(data);
      }

      setLoading(false);
    }

    fetchRoom();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!room) {
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

        <p className="text-gray-700 mb-6">
          {room.description}
        </p>

        <p className="text-sm text-gray-500">
          Location: {room.location}
        </p>

      </div>
    </main>
  );
}

import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function RoomsPage() {
  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading rooms</div>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>Rooms in Berlin</h1>

      {rooms && rooms.length === 0 && <p>No rooms available yet.</p>}

      {rooms?.map((room) => (
        <div
          key={room.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "6px",
          }}
        >
          <h2>{room.title}</h2>
          <p>
            {room.area} – €{room.price}
          </p>
          <p>{room.description}</p>
        </div>
      ))}
    </main>
  );
}

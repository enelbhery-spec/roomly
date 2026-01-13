import { notFound } from "next/navigation";
import { listings } from "@/data/listings";

export default async function ListingDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = listings[id as keyof typeof listings];

  if (!listing) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">
          {listing.title}
        </h1>

        {/* Price */}
        <p className="text-green-600 text-xl font-semibold mb-6">
          {listing.price}
        </p>

        {/* Main Description */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          {listing.description}
        </p>

        {/* Extra Content for SEO & AdSense */}
        <section className="space-y-4 text-gray-700">
          <p>
            This accommodation is located in one of Berlin’s most popular
            neighborhoods, offering easy access to public transportation,
            supermarkets, cafes, and essential services.
          </p>

          <p>
            The room is suitable for students, professionals, and newcomers
            who are looking for affordable and comfortable housing in Berlin.
          </p>

          <p>
            Renting a room in Berlin can be challenging, so early booking
            and choosing well-connected areas can save both time and money.
          </p>
        </section>

      </div>
    </main>
  );
}

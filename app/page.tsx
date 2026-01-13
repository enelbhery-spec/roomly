export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Roomly
          </h1>
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
          <a
            href="/add-listing"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded"
          >
            Add your listing
          </a>
        </section>

        {/* Filters */}
        <section className="flex gap-4 mb-6">
          <select className="border p-2 rounded w-1/2">
            <option>Room</option>
            <option>Shared Apartment</option>
          </select>

          <select className="border p-2 rounded w-1/2">
            <option>Max €500</option>
            <option>Max €700</option>
            <option>Max €900</option>
          </select>
        </section>

        {/* Listings */}
        <section className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg">
              Room in Neukölln
            </h2>
            <p className="text-gray-600">€450 / month</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg">
              Shared apartment in Kreuzberg
            </h2>
            <p className="text-gray-600">€600 / month</p>
          </div>
        </section>

        {/* How it works link */}
        <footer className="mt-10 text-center">
          <a
            href="/how-it-works"
            className="text-green-700 underline"
          >
            How Roomly works
          </a>
        </footer>

      </div>
    </main>
  );
}

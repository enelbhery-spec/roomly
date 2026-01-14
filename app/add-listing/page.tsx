"use client";

import { useState } from "react";

export default function AddListingPage() {
  const [images, setImages] = useState<FileList | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          Add your listing
        </h1>

        <p className="text-gray-600 mb-6">
          Publish your room or shared apartment for rent in Berlin.
        </p>

        <form className="space-y-5">
          {/* Listing type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Listing type
            </label>
            <select className="w-full border rounded p-2">
              <option value="room">Room</option>
              <option value="shared">Shared Apartment</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Cozy room near metro station"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly rent (€)
            </label>
            <input
              type="number"
              placeholder="e.g. 500"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. Neukölln, Berlin"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe the room, nearby transport, and conditions"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              className="w-full border rounded p-2 bg-white"
            />

            {images && (
              <p className="text-sm text-gray-500 mt-1">
                {images.length} image(s) selected
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
          >
            Submit listing
          </button>

          {/* Info */}
          <p className="text-sm text-gray-500 text-center">
            Listings are reviewed before publication.
          </p>
        </form>
      </div>
    </main>
  );
}

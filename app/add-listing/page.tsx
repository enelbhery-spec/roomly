"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AddListingPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          Add your listing
        </h1>

        <p className="text-gray-600 mb-6">
          Publish your room or shared apartment for rent in Berlin.
        </p>

        <form
          className="space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;

            setLoading(true);
            setError(null);
            setSuccess(false);

            const formData = new FormData(form);

            const { error: insertError } = await supabase
              .from("rooms")
              .insert({
                title: formData.get("title"),
                price: Number(formData.get("price")),
                area: formData.get("location"),
                description: formData.get("description"),
                room_type: formData.get("room_type"),
                phone: formData.get("phone"),
                facebook_url: formData.get("facebook_url"), // ✅ جديد
              });

            setLoading(false);

            if (insertError) {
              setError(insertError.message);
              return;
            }

            setSuccess(true);
            form.reset();
          }}
        >
          {/* Listing type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Listing type
            </label>
            <select
              name="room_type"
              required
              className="w-full border rounded p-2"
            >
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
              name="title"
              type="text"
              required
              className="w-full border rounded p-2"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly rent (€)
            </label>
            <input
              name="price"
              type="number"
              required
              className="w-full border rounded p-2"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              name="location"
              type="text"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone number (WhatsApp / Call)
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+4915123456789"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Facebook URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook link (optional)
            </label>
            <input
              name="facebook_url"
              type="url"
              placeholder="https://www.facebook.com/username"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full border rounded p-2"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Room added successfully ✅
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Saving..." : "Submit listing"}
          </button>
        </form>
      </div>
    </main>
  );
}

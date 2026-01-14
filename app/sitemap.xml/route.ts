import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://roomly-nine.vercel.app"; // ✏️ غيّر الدومين

  /* ===============================
     صفحات ثابتة
  ================================ */
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.6,
    },
  ];

  /* ===============================
     صفحات ديناميكية (غرف / عقارات)
     احذف الجزء ده لو مش عندك API
  ================================ */
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch("https://api.roomly-nine.com/rooms", {
      next: { revalidate: 3600 },
    });

    const rooms = await res.json();

    dynamicPages = rooms.map((room: any) => ({
      url: `${baseUrl}/room/${room.id}`,
      lastModified: new Date(room.updatedAt || Date.now()),
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap dynamic pages error:", error);
  }

  return [...staticPages, ...dynamicPages];
}

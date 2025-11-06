import { NextResponse } from "next/server";

/**
 * Minimal demo upload route:
 * - Accepts multipart/form-data with "file" and optional "albumId"
 * - Skips storage entirely and returns a stable placeholder image URL
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const albumId = (formData.get("albumId") as string | null) ?? "default";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Deterministic name so placeholder URL is stable for the same upload
    const fileName = `${albumId}/${Date.now()}-${file.name}`;

    // Just return a placeholder image for now (no Supabase/S3)
    const placeholderUrl = `https://picsum.photos/seed/${encodeURIComponent(fileName)}/800/600`;

    return NextResponse.json({ url: placeholderUrl, path: fileName });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

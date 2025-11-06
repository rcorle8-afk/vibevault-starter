import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const albumId = (formData.get("albumId") as string | null) ?? "default";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // For prototype: skip storage; just echo a stable placeholder image
    const fileName = `${albumId}/${Date.now()}-${file.name}`;
    const placeholderUrl = `https://picsum.photos/seed/${encodeURIComponent(
      fileName
    )}/800/600`;

    return NextResponse.json({ url: placeholderUrl, path: fileName });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

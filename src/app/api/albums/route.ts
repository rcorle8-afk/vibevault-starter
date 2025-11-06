import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const albumId = (form.get("albumId") as string | null) ?? "default";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Construct a path for where the file *would* live
    const fileName = `${albumId}/${Date.now()}-${file.name}`;

    // TEMP: placeholder image URL so build succeeds
    const placeholderUrl = `https://picsum.photos/seed/${encodeURIComponent(
      fileName
    )}/800/600`;

    return NextResponse.json({ url: placeholderUrl, path: fileName });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

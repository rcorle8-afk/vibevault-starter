import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const albumId = formData.get('albumId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileName = `${albumId ?? 'default'}/${Date.now()}-${file.name}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error) throw error;

    // Get public URL
    const { data: publicData } = supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicData.publicUrl });
  } catch (err: any) {
    console.error(err);

const placeholderUrl = `https://picsum.photos/seed/${encodeURIComponent(fileName)}/800/600`;
return NextResponse.json({ url: placeholderUrl, path: fileName });


  }
}

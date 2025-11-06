import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getAlbum(id: string) {
  return prisma.album.findUnique({
    where: { id },
    include: { photos: { orderBy: { createdAt: "desc" } } }
  });
}

export default async function AlbumPage({ params }: { params: { id: string } }) {
  const album = await getAlbum(params.id);
  if (!album) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{album.name}</h1>
          <p className="text-xs text-gray-500">Album ID: {album.id}</p>
        </div>
        <Link href="/" className="text-sm underline">All albums</Link>
      </div>

      <section className="space-y-3">
        <h2 className="font-semibold">Upload (demo)</h2>
        <p className="text-xs text-gray-600">Prototype note: This demo creates photo records but uses placeholder images for display. We can wire real S3 uploads next.</p>
        <DemoUpload albumId={album.id} />
      </section>

      <section>
        <h2 className="font-semibold mb-2">Photos</h2>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {album.photos.map(p => (
            <img key={p.id} src={`/api/photos/${p.id}`} alt="" className="mb-2 rounded" />
          ))}
          {album.photos.length === 0 && <p className="text-sm text-gray-600">No photos yet.</p>}
        </div>
      </section>
    </div>
  );
}

function DemoUpload({ albumId }: { albumId: string }) {
  async function action(formData: FormData) {
    "use server";
    const file = formData.get("file") as File | null;
    if (!file) return;

    await prisma.photo.create({
      data: {
        albumId,
        uploaderId: (await prisma.user.upsert({
          where: { email: "demo@local" },
          update: {},
          create: { email: "demo@local", name: "Demo" }
        })).id,
        storageKey: `placeholder/${Date.now()}-${file.name}`
      }
    });
  }

  return (
    <form action={action} className="flex items-center gap-2">
      <input type="file" name="file" accept="image/*" className="text-sm" />
      <button className="px-3 py-1 rounded bg-gray-900 text-white" type="submit">Add</button>
    </form>
  );
}

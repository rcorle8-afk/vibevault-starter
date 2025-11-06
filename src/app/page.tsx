import Link from "next/link";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { hashSync } from "bcryptjs";

async function createAlbum(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "").trim();
  if (!name) return;

  const ownerId = (await prisma.user.upsert({
    where: { email: "demo@local" },
    update: {},
    create: { email: "demo@local", name: "Demo" }
  })).id;

  await prisma.album.create({
    data: {
      name,
      ownerId,
      passwordHash: password ? hashSync(password, 10) : null
    }
  });

  revalidatePath("/");
}

export default async function Home() {
  const albums = await prisma.album.findMany({
    orderBy: { createdAt: "desc" },
    take: 10
  });

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-2">Create an album</h1>
        <form action={createAlbum} className="space-y-2 max-w-md">
          <input name="name" placeholder="Album name" className="w-full border rounded px-3 py-2" />
          <input name="password" placeholder="Album password (optional)" className="w-full border rounded px-3 py-2" />
          <button className="px-4 py-2 rounded bg-black text-white">Create</button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Recent albums</h2>
        <ul className="space-y-2">
          {albums.map(a => (
            <li key={a.id} className="border rounded p-3 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-gray-500">{a.id}</div>
                </div>
                <Link href={`/albums/${a.id}`} className="px-3 py-1 rounded bg-gray-900 text-white">Open</Link>
              </div>
            </li>
          ))}
          {albums.length === 0 && <p className="text-sm text-gray-600">No albums yet.</p>}
        </ul>
      </section>
    </div>
  );
}

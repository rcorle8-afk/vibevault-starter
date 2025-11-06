import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const photo = await prisma.photo.findUnique({ where: { id: params.id } });
  if (!photo) return new NextResponse("Not found", { status: 404 });
  // Placeholder image until S3 is wired:
  return NextResponse.redirect("https://picsum.photos/seed/" + encodeURIComponent(photo.id) + "/800/1200", 302);
}

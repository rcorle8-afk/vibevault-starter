# VibeVault Starter

Minimal Next.js + Prisma prototype for shared, passwordable photo albums.

## Quick start
1) Install Node LTS
2) `cp .env.example .env` and fill `DATABASE_URL`
3) `npm install`
4) `npm run prisma:generate`
5) `npm run prisma:migrate`
6) `npm run dev` → http://localhost:3000

Uploads are demo-only until you wire S3. Ask for the UploadClient snippet when ready.

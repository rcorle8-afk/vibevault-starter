import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.S3_REGION || "us-east-1";
const endpoint = process.env.S3_ENDPOINT;
const bucket = process.env.S3_BUCKET as string;

export const s3 = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

export async function presignUpload(key: string, contentType: string, expiresIn = 600) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3, command, { expiresIn });
  return { url };
}

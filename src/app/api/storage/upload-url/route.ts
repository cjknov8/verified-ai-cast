import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { getR2Config } from "@/lib/r2";
import { createClient } from "@/lib/supabase/server";

const allowedContentTypes = [
  "application/pdf",
  "audio/mpeg",
  "audio/wav",
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

function safeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
}

export async function POST(request: Request) {
  if (
    process.env.AUTH_ENFORCEMENT_ENABLED !== "true" ||
    process.env.PRIVATE_STORAGE_ENABLED !== "true"
  ) {
    return NextResponse.json({ error: "Private storage is not enabled." }, { status: 503 });
  }

  const r2 = getR2Config();
  if (!r2) {
    return NextResponse.json({ error: "R2 is not configured." }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const fileName = typeof body?.fileName === "string" ? safeFileName(body.fileName) : "";
  const contentType = typeof body?.contentType === "string" ? body.contentType : "";
  const assetId = typeof body?.assetId === "string" ? body.assetId : "";
  const sha256 = typeof body?.sha256 === "string" ? body.sha256.toLowerCase() : "";
  const size = Number(body?.size);
  const maxBytes = Number(process.env.STORAGE_UPLOAD_MAX_BYTES ?? 536870912);

  if (
    !fileName ||
    !/^[a-zA-Z0-9_-]{3,80}$/.test(assetId) ||
    !allowedContentTypes.includes(contentType) ||
    !Number.isSafeInteger(size) ||
    size <= 0 ||
    size > maxBytes ||
    !/^[a-f0-9]{64}$/.test(sha256)
  ) {
    return NextResponse.json({ error: "Invalid upload metadata." }, { status: 400 });
  }

  const objectKey = `${user.id}/${assetId}/${crypto.randomUUID()}-${fileName}`;
  const objectMetadata = {
    sha256,
    "owner-id": user.id,
    "asset-id": assetId,
    "original-name": encodeURIComponent(fileName),
  };
  const command = new PutObjectCommand({
    Bucket: r2.bucket,
    Key: objectKey,
    ContentType: contentType,
    ContentLength: size,
    Metadata: objectMetadata,
  });
  const uploadUrl = await getSignedUrl(r2.client, command, { expiresIn: 600 });

  return NextResponse.json({
    uploadUrl,
    objectKey,
    expiresInSeconds: 600,
    requiredHeaders: {
      "Content-Type": contentType,
      "x-amz-meta-sha256": objectMetadata.sha256,
      "x-amz-meta-owner-id": objectMetadata["owner-id"],
      "x-amz-meta-asset-id": objectMetadata["asset-id"],
      "x-amz-meta-original-name": objectMetadata["original-name"],
    },
  });
}

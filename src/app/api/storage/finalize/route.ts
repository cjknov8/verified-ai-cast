import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getR2Config } from "@/lib/r2";
import { createClient } from "@/lib/supabase/server";

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
  const objectKey = typeof body?.objectKey === "string" ? body.objectKey : "";
  if (!objectKey.startsWith(`${user.id}/`)) {
    return NextResponse.json({ error: "Object ownership mismatch." }, { status: 403 });
  }

  const object = await r2.client
    .send(new HeadObjectCommand({ Bucket: r2.bucket, Key: objectKey }))
    .catch(() => null);
  if (!object) {
    return NextResponse.json({ error: "Stored object was not found." }, { status: 404 });
  }
  if (
    object.Metadata?.["owner-id"] !== user.id ||
    !object.Metadata.sha256 ||
    !object.Metadata["asset-id"] ||
    !object.ContentType ||
    !object.ContentLength
  ) {
    return NextResponse.json({ error: "Stored object metadata is incomplete." }, { status: 409 });
  }

  const { data, error } = await supabase
    .from("asset_vault_objects")
    .insert({
      owner_id: user.id,
      asset_id: object.Metadata["asset-id"],
      object_key: objectKey,
      file_name: decodeURIComponent(object.Metadata["original-name"] ?? "asset"),
      content_type: object.ContentType,
      size_bytes: object.ContentLength,
      sha256: object.Metadata.sha256,
      status: "available",
    })
    .select("id, status, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: "Could not register stored object." }, { status: 409 });
  }

  return NextResponse.json({ object: data }, { status: 201 });
}

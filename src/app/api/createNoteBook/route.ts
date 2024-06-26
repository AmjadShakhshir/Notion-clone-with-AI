import { handleAsyncErrors } from "@/helper/catchErrorHandler";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImagePrompt, generateImage } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

export const POST = handleAsyncErrors(async (req: Request) => {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }
  const body = await req.json();
  const { name } = body;
  const image_description = await generateImagePrompt(name);
  if (!image_description) {
    return new NextResponse("Failed to generate image description", {
      status: 500,
    });
  }
  const image_url = await generateImage(image_description);
  if (!image_url) {
    return new NextResponse("Failed to generate image", {
      status: 500,
    });
  }

  const note_ids = await db
    .insert($notes)
    .values({
      name,
      imageUrl: image_url,
      userId,
    })
    .returning({
      insertedId: $notes.id,
    });

  return NextResponse.json({
    note_id: note_ids[0].insertedId,
  });
}, "Failed to create note");

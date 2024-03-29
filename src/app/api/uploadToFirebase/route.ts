import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadToFirebase } from "@/lib/firebase";

export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();
    // extract out the dalle imageUrl
    // save it to firebase storage
    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(noteId)));

    if (!notes[0].imageUrl) {
      return new Response("no image url", { status: 404 });
    }
    const firebase_url = await uploadToFirebase(notes[0].name, notes[0].imageUrl);
    if (!firebase_url) {
      return new Response("failed", { status: 500 });
    }
    // update the note with the firebase url
    await db
      .update($notes)
      .set({ imageUrl: firebase_url })
      .where(eq($notes.id, parseInt(noteId)));
    return new Response("success", { status: 200 });
  } catch (error) {
    console.log("Failed to upload to firebase", error);
    return new Response("failed", { status: 500 });
  }
}

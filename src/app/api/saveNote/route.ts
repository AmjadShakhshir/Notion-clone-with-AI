import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { handleAsyncErrors } from "@/helper/catchErrorHandler";

export const POST = handleAsyncErrors(async (req: Request) => {
  const body = await req.json();
  let { noteId, editorState } = body;
  if (!noteId || !editorState) {
    return new NextResponse("Missing editorState or noteId", {
      status: 400,
    });
  }
  noteId = parseInt(noteId);
  const notes = await db.select().from($notes).where(eq($notes.id, noteId));
  if (notes.length != 1) {
    return new NextResponse("Note not found", {
      status: 500,
    });
  }
  const note = notes[0];
  if (note.editorState != editorState) {
    await db.update($notes).set({ editorState }).where(eq($notes.id, noteId));
  }
  return new NextResponse("Success", {
    status: 200,
  });
}, "Failed to save note");

import { handleAsyncErrors } from "@/helper/catchErrorHandler";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const POST = handleAsyncErrors(async (req: Request) => {
  try {
    const { noteId } = await req.json();
    await db.delete($notes).where(eq($notes.id, parseInt(noteId)));
    return new Response("Delete successfully", { status: 200 });
  } catch (error) {
    console.error("Failed to delete note", error);
    return new Response("failed", { status: 500 });
  }
}, "Failed to delete note");

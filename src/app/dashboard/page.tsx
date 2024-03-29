import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton, auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { eq } from "drizzle-orm";

import CreateNoteDialog from "@/components/CreateNoteDialog";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import Image from "next/image";

type Props = {};

const DashboardPage = async (props: Props) => {
  const { userId } = auth();
  const notes = await db.select().from($notes).where(eq($notes.userId, userId!));

  return (
    <>
      <div className="grainy min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className="h-14"></div>
          <div className="flex justify-between items-center md:flex-row flex-col">
            <div className="flex items-center">
              <Link href="/">
                <Button className="bg-green-600" size="sm">
                  <ArrowLeft className="mr-1 w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="w-4"></div>
              <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
              <div className="w-4"></div>
              <UserButton />
            </div>
          </div>

          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>

          {/* List all the notes */}
          {notes.length === 0 && (
            <div className="text-center">
              <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
            </div>
          )}

          {/* display all the notes */}
          <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
            <CreateNoteDialog />
            {notes.map((note) => {
              return (
                <Link key={note.id} href={`/notebook/${note.id}`}>
                  <div className="border border-stone-200 p-2 overflow-hidden rounded-lg flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                    <Image width={400} height={200} alt={note.name} src={note.imageUrl || ""} />
                    <div className="p-4"></div>
                    <h3 className="text-xl font-semibold text-gray-900">{note.name}</h3>
                    <div className="h-1"></div>
                    <p className="text-sm text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
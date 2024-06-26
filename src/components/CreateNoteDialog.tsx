"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const CreateNoteDialog = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = React.useState("");

  const uploadToFirebase = useMutation({
    mutationFn: async (noteId: string) => {
      const response = await axios.post("/api/uploadToFirebase", { noteId });
      return response.data;
    },
  });

  const createNotebook = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNoteBook", { name: input });
      return response.data;
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      window.alert("Please enter a name for the notebook.");
      return;
    }
    createNotebook.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log("Created new notebook:", { note_id });
        // hit another endpoint to upload the temp dalle image to permanent firebase storage
        uploadToFirebase.mutate(note_id);
        router.push(`/notebook/${note_id}`);
      },
      onError: (error) => {
        console.error("Failed to create notebook", error);
        window.alert("Failed to create notebook");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex border-cyan-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-6 h-6 text-cyan-600" strokeWidth={3} />
          <h2 className="font-semibold text-cyan-600 sm:mt-2">New Note Book</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note Book</DialogTitle>
          <DialogDescription>You can create a new note by clicking the button below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOnSubmit}>
          <Input value={input} onChange={handleOnChange} placeholder="Name..." />
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button type="submit" className="bg-cyan-600" disabled={createNotebook.isPending}>
              {createNotebook.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" strokeWidth={2} />}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;

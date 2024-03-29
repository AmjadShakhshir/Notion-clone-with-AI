"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  noteId: number;
};

const DeleteButton = ({ noteId }: Props) => {
  const router = useRouter();
  const deleteNote = useMutation({
    mutationFn: async (noteId: number) => {
      const response = await axios.post("/api/deleteNote", { noteId });
      return response.data;
    },
  });

  const handleDelete = async (noteId: number) => {
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;
    deleteNote.mutate(noteId, {
      onSuccess: () => {
        console.log("Deleted note:", { noteId });
        router.push("/dashboard");
      },
      onError: (error) => {
        console.error("Failed to delete note", error);
      },
    });
  };
  return (
    <Button variant={"destructive"} size="sm" onClick={() => handleDelete(noteId)} disabled={deleteNote.isPending}>
      <Trash />
    </Button>
  );
};

export default DeleteButton;

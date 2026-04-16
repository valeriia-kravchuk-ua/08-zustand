"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import {fetchNoteById} from "@/lib/api";
import css from "./NotePreview.module.css";

const NotePreviewClient = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const { data: note, isLoading, isError } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    const createdAt = note
        ? new Date(note.createdAt).toLocaleString("uk-UA")
        : "";

    return (
        <Modal onClose={() => router.back()}>
            <div className={css.container}>
                <div className={css.header}>
                    <h2 className={css.title}>Note preview</h2>
                    <button
                        type="button"
                        className={css.backBtn}
                        onClick={() => router.back()}
                    >
                        Close
                    </button>
                </div>

                {isLoading && <p className={css.status}>Loading note...</p>}
                {isError && <p className={css.status}>Failed to load note.</p>}

                {note && (
                    <article>
                        <h3 className={css.noteTitle}>{note.title}</h3>
                        <p className={css.tag}>{note.tag}</p>
                        <p className={css.content}>{note.content}</p>
                        <p className={css.date}>Created at: {createdAt}</p>
                    </article>
                )}
            </div>
        </Modal>
    );
};

export default NotePreviewClient;

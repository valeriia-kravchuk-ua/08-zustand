

"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css'
import {fetchNoteById} from "@/lib/api";

const NoteDetailsClient = () => {
    const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading...</p>;

    if (error || !note) return <p>Some error..</p>;

    const formattedDate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;

    return (
        <div>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    <p className={css.tag}>{note.tag}</p>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{formattedDate}</p>
                </div>
            </div>

        </div>
    );
};

export default NoteDetailsClient;

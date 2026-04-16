"use client";

import {useEffect, useState} from "react";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchNotes, Tag} from "@/lib/api";
import {toast, Toaster} from "react-hot-toast";
import css from "@/app/notes/page.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import {useDebouncedCallback} from 'use-debounce';
import Link from "next/link";

type Props = {
    tag?: Tag;
};

const NotesClient = ({tag}: Props) => {


    const [currentPage, setCurrentPage] = useState(1);

    const [query, setQuery] = useState('');

    const {data, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['notes', tag ?? 'all', query, currentPage],
        queryFn: () => fetchNotes(currentPage, query, tag),
        placeholderData: keepPreviousData,
    });

    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 0;


    useEffect(() => {
        if (isLoading) {
            toast.loading("Loading...", {id: "(.)notes-loading"});
        }

        if (!isLoading) {
            toast.dismiss("(.)notes-loading");
        }

        if (isError) {
            toast.error("Error loading (.)notes");
        }

    }, [isLoading, isError]);



    const debounced = useDebouncedCallback(
        (text) => {
            setQuery(text);
            setCurrentPage(1)
        },
        1000
    );

    return (
        <>
            <section className={css.app}>
                <div className={css.box}>
                    <SearchBox onChange={debounced}/>
                    {isSuccess && totalPages > 1 && (
                        <Pagination
                            pageCount={totalPages}
                            forcePage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    )}
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                    <Link href="/notes/action/create" className={css.button}>Create note</Link>
                </div>

                {!isLoading && query && notes.length === 0 && (
                    <p className={css.empty}>Oops… nothing found 😢</p>
                )}
                {isSuccess && <NoteList notes={notes}/>}
            </section>
        </>
    )
}

export default NotesClient

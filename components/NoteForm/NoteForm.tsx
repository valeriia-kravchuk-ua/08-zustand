"use client"

import css from "./NoteForm.module.css";
import * as Yup from "yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addNote} from "@/lib/api";
import {useRouter} from "next/navigation";
import {toast, Toaster} from "react-hot-toast";
import {useNoteDraftStore} from "@/lib/store/noteStore";


type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface NoteFormValues {
    title: string;
    content: string;
    tag: Tag;
}

type Props = {
    categories: Tag[];
}

export default function NoteForm({categories}: Props) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {draft, setDraft, clearDraft} = useNoteDraftStore();

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };

    const addMutation = useMutation({
        mutationFn: addNote,
        onSuccess: () => {
            clearDraft();
            queryClient.invalidateQueries({queryKey: ["notes"]});
            router.push("/notes/filter/all");
        },
    });
    const handleSubmit = (formData: FormData) => {
        const values: NoteFormValues = {
            title: String(formData.get("title") ?? ""),
            content: String(formData.get("content") ?? ""),
            tag: formData.get("tag") as Tag,
        };
        addMutation.mutate(values);
    };
    const handleCancel = () => router.push('/notes/filter/all');

    return (
        <>
            <Toaster position="top-center"/>
            <form action={handleSubmit} className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input required id="title" type="text" name="title" className={css.input} minLength={3}
                           maxLength={50} onChange={handleChange} defaultValue={draft?.title} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                        maxLength={500} onChange={handleChange} defaultValue={draft?.content}
                    />

                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Category</label>
                    <select required id="tag" name="tag" className={css.select} defaultValue={draft?.tag}
                            onChange={handleChange}>
                        {categories.map(tag => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                    >
                        Create note
                    </button>
                </div>
            </form>
        </>
    );
}

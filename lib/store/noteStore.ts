import {create} from 'zustand';
import {OrderFormValues} from "@/lib/api";
import {persist} from "zustand/middleware";

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export type NoteDraft = {
    title: string;
    content: string;
    tag: NoteTag;
};

type NoteDraftStore = {
    draft: NoteDraft;
    setDraft: (note: NoteDraft) => void;
    clearDraft: () => void;
};

const initialDraft: NoteDraft = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) => set(() => ({draft: note})),
            clearDraft: () => set(() => ({draft: initialDraft})),
        }),
        {
            name: 'note-draft',
            partialize: (state) => ({draft: state.draft}),
        },
    )
);
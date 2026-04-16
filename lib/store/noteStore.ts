import {create} from 'zustand';
import {OrderFormValues} from "@/lib/api";
import {persist} from "zustand/middleware";

type NoteDraftStore = {
    draft: OrderFormValues;
    setDraft: (note: OrderFormValues) => void;
    clearDraft: () => void;
};

const initialDraft: OrderFormValues = {
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
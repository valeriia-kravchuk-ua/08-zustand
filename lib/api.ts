import axios from "axios";
import {Note} from "@/types/note";


interface NotesResponse {
    notes: Note[];
    totalPages: number;
}

export  type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface OrderFormValues {
    title: string;
    content: string;
    tag: Tag;
}

export async function fetchNotes(page?: number, query?: string, tag?: Tag): Promise<NotesResponse> {
    try {
        const response = await axios.get<NotesResponse>(
            "https://notehub-public.goit.study/api/notes",
            {
                params: {
                    page,
                    tag,
                    perPage: 6,
                    ...(query ? {search: query} : {}),
                },
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
                },
            },
        );
        // console.log("data", response.data.notes)
        return response.data;
    } catch (error: any) {
        console.log("ERROR:", error.response?.data);
        throw error;
    }
}


export const fetchNoteById = async (id: string) => {
    const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
    });
    return res.data;
};

export async function addNote(data: OrderFormValues): Promise<Note> {
    try {
        const response = await axios.post<Note>(
            "https://notehub-public.goit.study/api/notes",
            data,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.log("ERROR:", error.response?.data);
        throw error;
    }
}

export async function deleteNote(
    id: string
): Promise<Note> {
    try {
        const response = await axios.delete<Note>(
            `https://notehub-public.goit.study/api/notes/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.log("ERROR:", error.response?.data);
        throw error;
    }
}

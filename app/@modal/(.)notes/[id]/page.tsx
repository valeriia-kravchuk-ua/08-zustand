import {fetchNoteById} from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";
import {HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {dehydrate} from "@tanstack/query-core";
import {Metadata} from "next";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const note = await fetchNoteById(id)
    return {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 30),
        openGraph: {
            title: `Note: ${note.title}`,
            description: note.content.slice(0, 100),
            url: `https://notehub.com/notes/${id}`,
            siteName: 'NoteHub',
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: note.title,
                },
            ],
            type: 'article',
        },
    }
}
const NotePreview = async ({params}: Props) => {
    const {id} = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient/>
        </HydrationBoundary>
    )


};

export default NotePreview;

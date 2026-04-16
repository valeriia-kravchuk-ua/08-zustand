import {fetchNoteById, fetchNotes, Tag} from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import {HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {dehydrate} from "@tanstack/query-core";
import {Metadata} from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const {slug} = await params;
    const category = slug[0] === 'all' ? undefined : (slug[0] as Tag);
    const initialPage = 1;
    const initialQuery = "";
    const {notes} = await fetchNotes(initialPage, initialQuery, category)
    return {
        title: `Note filter: ${category ?? 'All'}`,
        description: "Note filter by category",
        openGraph: {
            title: `Note filter: ${category ?? 'All'}`,
            description: "Note filter by category",
            url: `https://notehub.com/notes/filter/${notes.map(note=>note.tag)}`,
            siteName: 'NoteHub',
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: `Note filter: ${category ?? 'All'}`,
                },
            ],
            type: 'article',
        },
    }
}
export default async function DocsPage({params}: Props) {
    const {slug} = await params;
    const category = slug[0] === 'all' ? undefined : (slug[0] as Tag);
    const queryClient = new QueryClient();
    const initialPage = 1;
    const initialQuery = "";

    await queryClient.prefetchQuery({
        queryKey: ["notes", category ?? "all", initialQuery, initialPage],
        queryFn: () => fetchNotes(initialPage, initialQuery, category),
    });

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesClient category={category} />
            </HydrationBoundary>
        </div>
    );
}

import css from './CreateNote.module.css'
import NoteForm from "@/components/NoteForm/NoteForm";
import {tags} from "@/components/SidebarNotes/SidebarNotes";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: `Create note`,
        description: "Create note",
        openGraph: {
            title: `Create note`,
            description: "Create note",
            url: `https://notehub.com/notes/action/create`,
            siteName: 'NoteHub',
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: `Create note`,
                },
            ],
            type: 'article',
        },
    }
}

function CreateNote() {

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm categories={tags}/>
            </div>
        </main>


    )
}

export default CreateNote
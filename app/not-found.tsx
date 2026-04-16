
import css from './not-found.module.css'
import Link from 'next/link';
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Not found",
    description: "404 - Page not found",
    openGraph: {
        title: "Not found ",
        description: "404 - Page not found",
        url: `https://notehub.com/not-found`,
        siteName: 'NoteHub',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
                width: 1200,
                height: 630,
                alt: "Not found",
            },
        ],
        type: 'article',
    },
};
const NotFound = () => {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
            <Link className={css.title} href="/">Go back home</Link>
        </div>
    );
};

export default NotFound;


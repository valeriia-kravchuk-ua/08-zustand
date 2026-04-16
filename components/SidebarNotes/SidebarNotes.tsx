import Link from 'next/link';
import css from "@/components/SidebarNotes/SidebarNotes.module.css";
import {Tag} from "@/lib/api";
export const tags:Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
const NotesSidebar = async () => {

    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href={`/notes/filter/all`} className={css.menuLink} >
                    All notes
                </Link>
            </li>
            {tags.map((tag) => (
                <li className={css.menuItem} key={tag}>
                    <Link className={css.menuLink} href={`/notes/filter/${tag}`}>{tag}</Link>
                </li>
            ))}
        </ul>
    );
};

export default NotesSidebar;

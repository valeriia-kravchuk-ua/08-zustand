import css from "./layout.module.css";

type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
    return (
        <section className={css.layout}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <div className={css.content}>{children}</div>
        </section>
    );
};

export default NotesLayout;

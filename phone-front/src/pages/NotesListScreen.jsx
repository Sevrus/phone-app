import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import notesData from "../data/notes.json";

import styles from "./NotesListScreen.module.css";

export default function NotesListScreen() {
    return (
        <main className={styles.container}>
            <Header />

            <div className={styles.content}>
                <h1 className={styles.title}>Notes</h1>

                <div className={styles.list}>
                    {notesData.map((note) => (
                        <Link to={`/notes/${note.id}`} key={note.id} className={styles.noteCard}>
                            <span className={styles.noteTitle}>{note.title}</span>
                            <span className={styles.noteDate}>{note.date}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <footer className={styles.footer}>
                <Link to="/principal">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" className={styles.footerIcon} />
                </Link>
            </footer>
        </main>
    );
}

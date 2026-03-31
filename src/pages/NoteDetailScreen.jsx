import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import notesData from "../data/notes.json";

import styles from "./NoteDetailScreen.module.css";

export default function NoteDetailScreen() {
    const { noteId } = useParams();
    const note = notesData.find(n => n.id === noteId);

    if (!note) {
        return (
            <main className={styles.container}>
                <Header />
                <div className={styles.content} style={{ textAlign: "center" }}>
                    Note introuvable
                </div>

                <footer className={styles.footer}>
                    <Link to="/notes">
                        <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                    </Link>
                </footer>
            </main>
        );
    }

    return (
        <main className={styles.container}>
                <Header />

            <div className={styles.content}>
                <h1 className={styles.title}>{note.title}</h1>
                <span className={styles.date}>Modifié le : {note.date}</span>
                <p className={styles.text}>{note.content}</p>
            </div>

            <footer className={styles.footer}>
                <Link to="/notes">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                </Link>
            </footer>
        </main>
    );
}

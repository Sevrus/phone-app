import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

import styles from "./GalleryScreen.module.css";
import galleryData from "../data/galleryData.json";

export default function GalleryScreen() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <main className={styles.mainContainer}>
            <Header />

            <div className={styles.title}>
                <h1>Galerie</h1>
            </div>

            <section className={styles.gallery}>
                <div className={styles.thumbnails}>
                    {galleryData.map((image) => (
                        <img
                            key={image["id"]}
                            src={image["thumb"]}
                            alt="Miniature"
                            onClick={() => setSelectedImage(image["full"])}
                            style={{ cursor: "pointer" }}
                        />
                    ))}
                </div>
            </section>

            {selectedImage && (
                <div
                    className={styles.modal}
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Plein écran"
                        className={styles.fullscreenImage}
                    />
                </div>
            )}

            <footer className={styles.footer}>
                <Link to="/principal">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                </Link>
            </footer>
        </main>
    );
}

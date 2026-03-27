import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

import styles from "./GalleryScreen.module.css";
import normalGallery from "../data/normalGallery.json";
import secretGallery from "../data/secretGallery.json";

export default function GalleryScreen() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);

    const handleUnlockAttempt = () => {
        const code = prompt("Entrez le code PIN du dossier sécurisé :");
        if (code === "1995") {
            setIsSecretUnlocked(true);
            alert("Dossier déverrouillé.");
        } else if (code !== null) {
            alert("Code incorrect.");
        }
    };

    const displayedGallery = isSecretUnlocked ? secretGallery : normalGallery;

    return (
        <main className={styles.mainContainer}>
            <Header />

            <div className={styles.title}>
                <h1>{isSecretUnlocked ? "Dossier Caché" : "Galerie"}</h1>
            </div>

            <section className={styles.gallery}>
                <div className={styles.thumbnails}>
                    {displayedGallery.map((image) => (
                        <img key={image.id} src={image["thumb"]} alt="Miniature"
                             onClick={() => setSelectedImage(image["full"])} style={{ cursor: "pointer" }} />
                    ))}
                </div>

                {!isSecretUnlocked && (
                    <div onClick={handleUnlockAttempt} style={{ textAlign: "center", marginTop: "30px", cursor: "pointer", paddingBottom: "20px" }}>
                        <span style={{ fontSize: "40px" }}>🗄️🔒</span>
                        <p style={{ color: "#888", marginTop: "5px" }}>Dossier sécurisé</p>
                    </div>
                )}
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

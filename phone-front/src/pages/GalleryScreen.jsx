import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

import styles from "./GalleryScreen.module.css";
import normalGallery from "../data/normalGallery.json";

export default function GalleryScreen() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
    const [showPinModal, setShowPinModal] = useState(false);
    const [pinCode, setPinCode] = useState("");
    const [pinError, setPinError] = useState("");

    const visibleImages = isSecretUnlocked
        ? normalGallery
        : normalGallery.filter(img => !img["isSecret"]);

    const handleOpenSecret = () => {
        if (isSecretUnlocked) {
            setIsSecretUnlocked(false);
        } else {
            setShowPinModal(true);
            setPinCode("");
            setPinError("");
        }
    };

    const submitPin = () => {
        const pinSecretFolder = import.meta.env.VITE_PIN_SECRET_FOLDER;
        if (pinCode === pinSecretFolder) {
            setIsSecretUnlocked(true);
            setShowPinModal(false);
        } else {
            setPinError("Code incorrect.");
            setPinCode("");
        }
    };

    return (
        <main className={`${styles.mainContainer} ${selectedImage ? styles.landscapeMode : ''}`}>

            {!selectedImage && <Header />}

            {/* --- MODALE DU CODE PIN (Interne au téléphone) --- */}
            {showPinModal && (
                <div className={styles.systemModalOverlay}>
                    <div className={styles.systemModal}>
                        <h3 className={styles.modalTitle}>Dossier sécurisé</h3>
                        <input
                            type="password"
                            className={styles.pinInput}
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            maxLength={4}
                            placeholder="PIN"
                            autoFocus
                        />
                        <div className={styles.errorText}>{pinError}</div>
                        <div className={styles.modalButtons}>
                            <button className={`${styles.modalBtn} ${styles.btnCancel}`} onClick={() => setShowPinModal(false)}>
                                Annuler
                            </button>
                            <button className={`${styles.modalBtn} ${styles.btnSubmit}`} onClick={submitPin}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- VISUALISEUR D'IMAGE PLEIN ÉCRAN (Paysage) --- */}
            {selectedImage && (
                <div className={styles.imageViewer}>
                    <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>✕</button>
                    <img
                        src={selectedImage["full"]}
                        alt="Plein écran"
                        className={styles.fullImage}
                    />
                </div>
            )}

            {/* --- CONTENU NORMAL DE LA GALERIE --- */}
            <div className={styles.content}>

                <div className={styles.secretFolderBtn} onClick={handleOpenSecret}>
                    🔒 {isSecretUnlocked ? "Verrouiller le dossier secret" : "Ouvrir le dossier sécurisé"}
                </div>

                <div className={styles.grid}>
                    {visibleImages.map(img => (
                        <img
                            key={img.id}
                            src={img["thumb"]}
                            alt="Miniature"
                            className={styles.thumbnail}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>
            </div>

            {!selectedImage && (
                <footer className={styles.footer}>
                    <Link to="/principal">
                        <img src="/assets/svg/arrow-back.svg" alt="Retour" />
                    </Link>
                </footer>
            )}
        </main>
    );
}

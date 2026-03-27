import { useState, useEffect, useRef } from 'react'; // On ajoute useRef
import { Link } from 'react-router-dom';
import { usePhone } from '../context/PhoneContext';
import styles from './CameraScreen.module.css';

export default function CameraScreen() {
    const [showCreepyGif, setShowCreepyGif] = useState(false);
    const { markCameraAsBroken } = usePhone();

    // On crée une référence pour savoir si le son a déjà été joué
    const hasPlayed = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            // VERIFICATION : Si le son n'a pas encore été joué
            if (!hasPlayed.current) {
                const audio = new Audio('/assets/audio/glass-shatter.mp3');
                audio.volume = 0.6;

                audio.play()
                    .then(() => {
                        hasPlayed.current = true; // On marque comme joué SEULEMENT après le succès
                    })
                    .catch(e => console.log("Lecture audio bloquée ou échouée", e));

                setShowCreepyGif(true);
                markCameraAsBroken();
            }
        }, 3000);

        return () => {
            clearTimeout(timer); // Nettoyage crucial du timer si on quitte la page avant les 3s
        };
    }, [markCameraAsBroken]);

    return (
        <main className={styles.container}>
            {showCreepyGif ? (
                <>
                    <div className={styles.brokenGlassOverlay} />
                    <div className={styles.scareContent}>
                        <img src="/assets/images/photo-lotus.webp" alt="Forêt" className={styles.scareImage} />
                        <h2 className={styles.scareTitle}>彼らが到着する</h2>
                    </div>
                </>
            ) : (
                <div className={styles.loaderContainer}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>Initialisation...</p>
                </div>
            )}

            <footer>
                <Link to="/principal" className={styles.backButton}>
                    <img src="/assets/svg/arrow-back.svg" alt="Retour" className={styles.backIcon} />
                </Link>
            </footer>
        </main>
    );
}

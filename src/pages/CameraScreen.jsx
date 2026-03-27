import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePhone } from '../context/PhoneContext';

import styles from "./CameraScreen.module.css";

export default function CameraScreen() {
    const [showCreepyGif, setShowCreepyGif] = useState(false);
    const { markCameraAsBroken } = usePhone();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCreepyGif(true);
            markCameraAsBroken();
        }, 3000);
        return () => clearTimeout(timer);
    }, [markCameraAsBroken]);

    return (
        <main className={styles.container}>

            {showCreepyGif ? (
                <>
                <div className={styles.brokenGlassOverlay}/>
                <div className={styles.scareContent}>
                    <img src="/assets/images/photo-lotus.webp" alt="Forêt" className={styles.scareImage}/>
                    <h2 className={styles.scareTitle}>
                        彼らが到着する
                    </h2>
                </div>
                </>
            ) : (
                <div className={styles.loaderContainer}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>Initialisation...</p>
                </div>
            )}

            <Link to="/principal" className={styles.backButton}>
                <img src="/assets/svg/arrow-back.svg" alt="Retour" className={styles.backIcon} />
            </Link>
        </main>
    );
}

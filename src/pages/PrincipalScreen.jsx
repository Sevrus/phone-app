import { Link } from "react-router-dom";
import Header from "../components/Header";
import WeatherWidget from "../components/WeatherWidget";
import { usePhone } from '../context/PhoneContext';

import styles from "./PrincipalScreen.module.css";

export default function PrincipalScreen() {
    const { isCameraBroken } = usePhone()

    return (
        <main className={styles.mainContainer}>
            <Header />
            <WeatherWidget />

            <section className={styles.services}>
                    <Link to="/gallery" className={styles.serviceItem}>
                        <img src="/assets/svg/gallery.svg" alt="Icône de galerie" />
                        <span>Galerie</span>
                    </Link>

                <div className={styles.serviceItem}>
                    <div className={`${styles.serviceFrame} ${styles.frameMagenta}`}>
                        <img src="/assets/svg/basket.svg" alt="Icône du Galaxy Store" />
                    </div>
                    <span>Galaxy Store</span>
                </div>

                <div className="services__google-chrome">
                    <Link to="/browser">
                        <div className="services__google-chrome__frame">
                            <img src="/assets/svg/chrome.svg" alt="Icône Google Chrome" />
                        </div>
                    </Link>
                    <span>Chrome</span>
                </div>

                <Link to="/notes" className={styles.serviceItem}>
                    <div className={`${styles.serviceFrame} ${styles.frameYellow}`}>
                        📝
                    </div>
                    <span>Notes</span>
                </Link>
            </section>

            <div className={styles.rounds}>
                <div className={styles.round}></div>
                <div className={styles.round}></div>
                <div className={styles.round}></div>
                <div className={styles.round}></div>
            </div>

            <section className={styles.utilities}>
                <Link to="/appels">
                    <img src="/assets/svg/telephone.svg" alt="Appels" />
                </Link>
                <Link to="/sms">
                    <img src="/assets/svg/sms.svg" alt="SMS" />
                </Link>
                {isCameraBroken ? (
                    <div className={styles.lotusIcon}>🌸</div>
                ) : (
                    <Link to="/camera">
                        <img src="/assets/svg/camera.svg" alt="Appareil photo" />
                    </Link>
                )}
            </section>
        </main>
    );
}

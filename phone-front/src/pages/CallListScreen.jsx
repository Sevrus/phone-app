import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

import callsData from "../data/callsData.json";
import styles from "./CallListScreen.module.css";

export default function CallListScreen() {
    return (
        <main>
            <Header />

            <div className={styles.title}>
                <h1 className="call-list-title__title">Liste d"appels</h1>
            </div>

            <section className={styles.callList}>
                {callsData.map((dayGroup, index) => (
                    <div key={index}>
                        <h3 className={styles.day}>{dayGroup.day}</h3>

                        {dayGroup["calls"].map(call => (
                            <div key={call["id"]} className={styles.days}>
                                <img src="/assets/svg/rate.svg" alt="Icône appel manqué" />

                                <div className={styles.contactDetails}>
                                    <span className={styles.phone}>
                                        {call["phone"]}
                                    </span>
                                    <span className={styles.name}>
                                        {call["name"]}
                                    </span>
                                </div>
                                <span className={styles.hours}>{call["time"]}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </section>

            <footer className={styles.footer}>
                <Link to="/principal">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                </Link>
            </footer>
        </main>
    );
}

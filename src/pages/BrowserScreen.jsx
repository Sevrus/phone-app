import { Link } from 'react-router-dom';
import Header from '../components/Header';
import historyData from '../data/history.json';

import styles from "./BrowserScreen.module.css";

export default function BrowserScreen() {
    return (
        <main>
                <Header />

            {/* Fausse barre de recherche Chrome */}
            <div className={styles.searchBar}>
                <img src="/assets/svg/chrome.svg" alt="Chrome" />
                <h1>Historique</h1>
            </div>

            <section className={styles.historySection}>
                {historyData.map((dayBlock, index) => (
                    <div key={index} className={styles.historyDay}>
                        <h3 className={styles.historyDate}>
                            {dayBlock.date}
                        </h3>

                        <div className={styles.cards}>
                            {dayBlock.searches.map((search, sIndex) => (
                                <div key={sIndex} style=
                                    {{
                                       borderBottom: sIndex !== dayBlock.searches.length - 1 ? '1px solid #f1f3f4' : 'none'
                                    }}
                                    className={styles.card}
                                >
                                    <span className={styles.cardTime}>
                                        {search.time}
                                    </span>
                                    <div>
                                        <p className={styles.query}>
                                            {search.query}
                                        </p>
                                        <span className={styles.site}>
                                            {search.site}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <footer className={styles.footer} >
                <Link to="/principal">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                </Link>
            </footer>
        </main>
    );
}

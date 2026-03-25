import { useState, useEffect } from "react";

import styles from "./Header.module.css";

export default function Header() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const date = new Date();
            const tokyoTime = date.toLocaleTimeString("fr-FR", {
                timeZone: "Asia/Tokyo",
                hour: "2-digit",
                minute: "2-digit"
            });
            setTime(tokyoTime);
        };

        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <header className={styles.header}>
            <div className="hours">{time}</div>
            <div className={styles.connection}>
                <img className={styles.images} src="/assets/svg/antenna.svg" alt="Icône réseau" />
                <span className="connection__percent">30%</span>
                <img className={styles.images} src="/assets/svg/battery.svg" alt="Icône batterie" />
            </div>
        </header>
    );
}

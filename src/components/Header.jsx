import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

import styles from "./Header.module.css";

export default function Header() {
    const [time, setTime] = useState('');
    const [battery, setBattery] = useState(30);
    const [isShuttingDown, setIsShuttingDown] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const drainRate = 30000;

        const batteryInterval = setInterval(() => {
            setBattery(prevBattery => {
                const newBattery = prevBattery - 1;

                if (newBattery <= 0) {
                    setIsShuttingDown(true);
                    setTimeout(() => {
                        navigate("/off");
                    }, 600);
                    return 0;
                }
                return newBattery;
            });
        }, drainRate);

        return () => clearInterval(batteryInterval);
    }, [navigate]);

    const handleRecharge = () => {
        setBattery(100);
        setIsShuttingDown(false);
    };

    return (
        <>
            {isShuttingDown && <div className="shutdown-overlay"></div>}

        <header className={styles.header}>
            <div className="hours">{time}</div>
            <div className={styles.connection}>
                <img className={styles.images} src="/assets/svg/antenna.svg" alt="Icône réseau" />
                <span className="connection__percent" style={{ color: battery <= 10 ? "red" : "white" }}>
                    {battery}%
                </span>
                <img
                    className={styles.images}
                    src="/assets/svg/battery.svg"
                    alt="Icône batterie"
                    onClick={handleRecharge}
                    style={{ cursor: "pointer" }}
                />
            </div>
        </header>
        </>
    );
}

import { usePhone } from "../context/PhoneContext";

import styles from "./Header.module.css";

export default function Header() {
    const { time, battery, isShuttingDown, recharge } = usePhone();

    return (
        <>
            {isShuttingDown && <div className="shutdown-overlay"></div>}

            <header className={styles.header}>
                <div className="hours">{time}</div>
                <div className={styles.connection}>
                    <img src="/assets/svg/antenna.svg" alt="Icône réseau" className={styles.images} />

                    <span className="connection__percent" style={{ color: battery <= 10 ? "red" : "white" }}>
                        {battery}%
                    </span>

                    <img
                        src="/assets/svg/battery.svg"
                        alt="Icône batterie"
                        onClick={recharge}
                        className={styles.images}
                        style={{ cursor: "pointer" }}
                        title="MJ : Recharger"
                    />
                </div>
            </header>
        </>
    );
}

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styles from "./MjControlScreen.module.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

export default function MjControlScreen() {
    const socketRef = useRef(null);

    const [batteryLevel, setBatteryLevel] = useState(30);
    const [isCharging, setIsCharging] = useState(false);
    const [smsSender, setSmsSender] = useState("Inconnu");
    const [smsMessage, setSmsMessage] = useState("");

    useEffect(() => {
        socketRef.current = io(SERVER_URL);

        socketRef.current.on('receive_mj_state', (state) => {
            if (state.isCharging !== undefined) {
                setIsCharging(state.isCharging);
            }
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);

    const sendCommand = (type, payload = null) => {
        if (socketRef.current) {
            socketRef.current.emit("send_mj_command", { type, payload });
            if (type === 'TOGGLE_CHARGING') {
                setIsCharging((prev) => !prev);
            }
        }
    };

    const handleSendSms = (e) => {
        e.preventDefault();
        if (!smsMessage.trim()) return;

        sendCommand("RECEIVE_SMS", {
            id: Date.now(),
            sender: smsSender,
            text: smsMessage,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        });

        setSmsMessage("");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                🎛️ Panneau de Contrôle Maître du Jeu
            </h1>

            <div className={styles.grid}>

                {/* --- BATTERIE --- */}
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>
                            🔋 Gestion de la Batterie
                            <span style={{ marginLeft: '10px', fontSize: '0.8em', color: isCharging ? '#22c55e' : '#ef4444' }}>
                                {isCharging ? '⚡ (En charge)' : '🔋 (Sur batterie)'}
                            </span>
                        </h3>

                        <p>Niveau sélectionné : <strong>{batteryLevel}%</strong></p>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={batteryLevel}
                            onChange={(e) => setBatteryLevel(Number(e.target.value))}
                            className={styles.rangeInput}
                        />

                        <div className={styles.buttonGroup}>
                            <button
                                onClick={() => sendCommand('SET_BATTERY', batteryLevel)}
                                className={`${styles.btn} ${styles.btnPrimary}`}
                            >
                                Appliquer
                            </button>

                            <button
                                onClick={() => sendCommand('TOGGLE_CHARGING')}
                                className={`${styles.btn} ${styles.btnWarning}`}
                                style={{ backgroundColor: isCharging ? '#15803d' : '#d97706' }}
                            >
                                {isCharging ? '🔌 Débrancher le secteur' : '⚡ Brancher le secteur'}
                            </button>

                            <button
                                onClick={() => sendCommand('KILL_BATTERY')}
                                className={`${styles.btn} ${styles.btnDanger}`}
                            >
                                💥 Couper (0%)
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- SMS EN TEMPS RÉEL --- */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>💬 Envoyer un SMS</h3>
                    <form onSubmit={handleSendSms} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Expéditeur (ex: Inconnu, Maman, Corbeau)"
                            value={smsSender}
                            onChange={(e) => setSmsSender(e.target.value)}
                            className={styles.input}
                        />
                        <textarea
                            rows="3"
                            placeholder="Contenu du message..."
                            value={smsMessage}
                            onChange={(e) => setSmsMessage(e.target.value)}
                            className={styles.textarea}
                        />
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles.btnSuccess}`}
                        >
                            📲 Envoyer le SMS
                        </button>
                    </form>
                </div>

                {/* --- SYSTÈME & RÉINITIALISATION --- */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>⚙️ Gestion Système</h3>
                    <div className={styles.form}>
                        <button
                            onClick={() => sendCommand('RESET_PHONE')}
                            className={`${styles.btn} ${styles.btnNeutral}`}
                        >
                            🔄 Reset Complet du Téléphone
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

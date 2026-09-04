import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

export default function MjControlScreen() {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(SERVER_URL);

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);

    const triggerEvent = (commandName) => {
        if (socketRef.current) {
            socketRef.current.emit("send_mj_command", commandName);
        }
    };

    return (
        <div>
            <h1>Panneau MJ — Serveur Cloud XL</h1>
            <p >Connecté à : {SERVER_URL}</p>
            <hr />

            <div>
                <button
                    onClick={() => triggerEvent("TRIGGER_CAMERA")}
                >
                    DÉCLENCHER JUMP SCARE (Appareil Photo)
                </button>

                <button
                    onClick={() => triggerEvent("KILL_BATTERY")}
                >
                    THÉÂTRALISER LA PANNE (Batterie à 0%)
                </button>

                <button
                    onClick={() => triggerEvent("RESET_PHONE")}
                >
                    RÉINITIALISER LE TÉLÉPHONE (Full Reset)
                </button>
            </div>
        </div>
    );
}

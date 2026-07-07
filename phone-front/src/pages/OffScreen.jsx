import { useNavigate } from "react-router-dom";

import styles from "./OffScreen.module.css";

export default function OffScreen() {
    const navigate = useNavigate();

    const handleSecretWakeUp = () => {
        navigate("/");
    };

    return (
        <main className={styles.container}>
            <div
                onClick={handleSecretWakeUp}
                className={styles.mjButton}
                title="MJ : Rallumer (Double-clic discret)"
            />
        </main>
    );
}

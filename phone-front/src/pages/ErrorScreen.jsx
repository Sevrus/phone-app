import styles from "./ErrorScreen.module.css";

export default function ErrorScreen() {
    return (
        <main className={styles.mainContainer}>
            <section className={styles.errorContainer}>
                <h1>Votre numéro est bloqué.</h1>
                <p>Veuillez contacter votre service client.</p>

                <div
                    onClick={() => window.location.href = '/'}
                    style={{ width: '50px', height: '50px', position: 'absolute', bottom: 0, right: 0 }}
                    title="Bouton secret MJ"
                />
            </section>
        </main>
    );
}

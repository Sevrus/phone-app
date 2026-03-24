export default function ErrorScreen() {
    return (
        <main>
            <section className="error-container">
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

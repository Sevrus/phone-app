import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import conversationsData from '../data/conversations.json';

import styles from './ConversationScreen.module.css';

export default function ConversationScreen() {
    const { contactId } = useParams();

    const conversation = conversationsData[contactId];

    if (!conversation) {
        return (
            <main>
                <Header />
                <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
                    <h2>Conversation introuvable</h2>
                    <Link to="/sms" style={{ color: '#4da6ff' }}>Retour aux messages</Link>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Header />

            <div className={styles.title}>
                <h1 className="conversation-title__title">{conversation.name}</h1>
                <span className={styles.titleNumber}>{conversation.number}</span>
            </div>

            <section className={styles.sms}>
                {conversation["days"].map((dayBlock, dayIndex) => (
                    <div key={dayIndex}>
                        <h3 className={styles.day}>{dayBlock.date}</h3>

                        {dayBlock.messages.map((msg, msgIndex) => (
                            <div key={msgIndex} className={styles.days}>

                                {msg.type === "received" ? (
                                    <>
                                        <img src={conversation["avatar"]} alt={`Avatar de ${conversation.name}`} />
                                        <div className={styles.smsReceived}>
                                            <p className={styles.textReceived}>{msg.text}</p>
                                            <span className={styles.hoursReceived}>{msg.time}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className={styles.smsSent}>
                                    <p className={styles.textSent}>{msg.text}</p>
                            <span className={styles.hoursSent}>{msg.time}</span>
                    </div>
                    )}

            </div>
            ))}
        </div>
    ))}
</section>

    <footer className={styles.footer}>
        <Link to="/sms">
            <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
        </Link>
    </footer>
</main>
);
}

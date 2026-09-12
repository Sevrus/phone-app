import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import conversationsData from '../data/conversations.json';
import { usePhone } from '../context/PhoneContext.jsx';
import styles from './ConversationScreen.module.css';

const normalize = (str) =>
    str ? str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

export default function ConversationScreen() {
    const { contactId } = useParams();
    const { messages } = usePhone();

    // Recherche dans le JSON statique
    const conversationKey = Object.keys(conversationsData).find(
        (key) => normalize(key) === normalize(contactId)
    );
    const conversation = conversationsData[conversationKey];

    // Filtrage des messages dynamiques envoyés par le MJ pour cette conversation
    const liveMessages = messages.filter((m) => {
        const senderNormalized = normalize(m.sender);
        const contactIdNormalized = normalize(contactId);
        const conversationNameNormalized = conversation ? normalize(conversation.name) : "";

        return (
            senderNormalized === contactIdNormalized ||
            (conversationNameNormalized && senderNormalized === conversationNameNormalized)
        );
    });

    if (!conversation && liveMessages.length === 0) {
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

    const contactName = conversation ? conversation.name : (liveMessages[0]?.sender || contactId);
    const contactNumber = conversation ? conversation.number : 'Inconnu';
    const contactAvatar = conversation ? conversation.avatar : '/assets/svg/random.svg';

    return (
        <main>
            <Header />

            <div className={styles.title}>
                <h1 className="conversation-title__title">{contactName}</h1>
                <span className={styles.titleNumber}>{contactNumber}</span>
            </div>

            <section className={styles.sms}>
                {/* Historic JSON messages */}
                {conversation?.days?.map((dayBlock, dayIndex) => (
                    <div key={dayIndex}>
                        <h3 className={styles.day}>{dayBlock.date}</h3>
                        {dayBlock.messages.map((msg, msgIndex) => (
                            <div key={msgIndex} className={styles.days}>
                                {msg.type === "received" ? (
                                    <>
                                        <img src={contactAvatar} alt={`Avatar de ${contactName}`} />
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

                {/* Live MJ messages appended below */}
                {liveMessages.length > 0 && (
                    <div>
                        <h3 className={styles.day}>Aujourd'hui</h3>
                        {liveMessages.map((msg) => (
                            <div key={msg.id} className={styles.days}>
                                <img src={contactAvatar} alt={`Avatar de ${contactName}`} />
                                <div className={styles.smsReceived}>
                                    <p className={styles.textReceived}>{msg.text}</p>
                                    <span className={styles.hoursReceived}>{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <footer className={styles.footer}>
                <Link to="/sms">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                </Link>
            </footer>
        </main>
    );
}

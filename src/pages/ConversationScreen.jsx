import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import conversationsData from '../data/conversations.json';

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

            <div className="conversation-title">
                <h1 className="conversation-title__title">{conversation.name}</h1>
                <span className="conversation-title__number">{conversation.number}</span>
            </div>

            <section className="conversation-sms">
                {conversation.days.map((dayBlock, dayIndex) => (
                    <div key={dayIndex}>
                        <h3 className="conversation-sms__day">{dayBlock.date}</h3>

                        {dayBlock.messages.map((msg, msgIndex) => (
                            <div key={msgIndex} className="conversation-sms__days">

                                {msg.type === "received" ? (
                                    <>
                                        <img src={conversation.avatar} alt={`Avatar de ${conversation.name}`} />
                                        <div className="conversation-sms__days__sms-received">
                                            <p className="conversation-sms__days__sms-received__text">{msg.text}</p>
                                            <span className="conversation-sms__days__sms-received__hours">{msg.time}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="conversation-sms__days__sms-sent">
                                    <p className="conversation-sms__days__sms-sent__text">{msg.text}</p>
                            <span className="conversation-sms__days__sms-sent__hours">{msg.time}</span>
                    </div>
                    )}

            </div>
            ))}
        </div>
    ))}
</section>

    <footer className="footer">
        <Link to="/sms">
            <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
        </Link>
    </footer>
</main>
);
}

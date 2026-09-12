import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import smsData from '../data/sms.json';
import { usePhone } from '../context/PhoneContext.jsx';
import styles from './SmsListScreen.module.css';

const normalize = (str) =>
    str ? str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

export default function SmsListScreen() {
    const { messages, setUnreadSmsCount } = usePhone();

    useEffect(() => {
        setUnreadSmsCount(0);
    }, [setUnreadSmsCount]);

    const conversationsMap = {};

    smsData.forEach((sms) => {
        const key = normalize(sms.name);
        conversationsMap[key] = {
            id: sms.htmlName,
            name: sms.name,
            message: sms.message,
            date: sms.date,
            avatar: sms.image.replace('../../', '/')
        };
    });

    messages.forEach((sms) => {
        const key = normalize(sms.sender);

        if (conversationsMap[key]) {
            conversationsMap[key].message = sms.text;
            conversationsMap[key].date = sms.time;
        } else {
            conversationsMap[key] = {
                id: key,
                name: sms.sender,
                message: sms.text,
                date: sms.time,
                avatar: '/assets/svg/random.svg'
            };
        }
    });

    const conversationList = Object.values(conversationsMap);

    return (
        <main>
            <Header />
            <h1 className={styles.title}>Messages</h1>

            <section className={styles.sms}>
                <div className={styles.container}>
                    {conversationList.map((conv) => (
                        <Link to={`/sms/${conv.id}`} key={conv.id} className={styles.item}>
                            <div className={styles.avatar}>
                                <img src={conv.avatar} alt={`Avatar de ${conv.name}`} />
                            </div>

                            <div className={styles.text}>
                                <h2>{conv.name}</h2>
                                <p>{conv.message}</p>
                            </div>

                            <div className={styles.date}>
                                <span>{conv.date}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <footer className={styles.footer}>
                <Link to="/principal">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                </Link>
            </footer>
        </main>
    );
}

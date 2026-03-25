import { Link } from 'react-router-dom';
import Header from '../components/Header';
import smsData from '../data/sms.json';

import styles from './SmsListScreen.module.css';

export default function SmsListScreen() {
    return (
        <main>
            <Header />

            <h1 className={styles.title}>Messages</h1>

            <section className={styles.sms}>
                <div className={styles.container}>
                    {smsData.map((sms, index) => (
                        <Link to={`/sms/${sms.htmlName}`} key={index} className={styles.item}>

                            <div className={styles.avatar}>
                                <img src={sms.image.replace('../../', '/')} alt={`Avatar de ${sms.name}`} />
                            </div>

                            <div className={styles.text}>
                                <h2>{sms.name}</h2>
                                <p>{sms.message}</p>
                            </div>

                            <div className={styles.date}>
                                <span>{sms.date}</span>
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

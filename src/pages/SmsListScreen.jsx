import { Link } from 'react-router-dom';
import Header from '../components/Header';
import smsData from '../data/sms.json';

export default function SmsListScreen() {
    return (
        <main>
            <Header />

            <h1 className="title">Messages</h1>

            <section className="sms">
                <div className="sms__container">
                    {smsData.map((sms, index) => (
                        <Link to={`/sms/${sms.htmlName}`} key={index} className="sms__container__item">

                            <div className="sms__container__item__avatar">
                                <img src={sms.image.replace('../../', '/')} alt={`Avatar de ${sms.name}`} />
                            </div>

                            <div className="sms__container__item__text">
                                <h2>{sms.name}</h2>
                                <p>{sms.message}</p>
                            </div>

                            <div className="sms__container__item__date">
                                <span>{sms.date}</span>
                            </div>

                        </Link>
                    ))}
                </div>
            </section>

            <footer className="footer">
                <Link to="/principal">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                </Link>
            </footer>
        </main>
    );
}

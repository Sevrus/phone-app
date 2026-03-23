import { Link } from 'react-router-dom';
import Header from '../components/Header';
import WeatherWidget from '../components/WeatherWidget';

export default function PrincipalScreen() {
    return (
        <main>
            <Header />
            <WeatherWidget />

            <section className="services">
                <div className="services__gallery">
                    <Link to="/gallery">
                        <img src="/assets/svg/gallery.svg" alt="Icône de galerie" />
                    </Link>
                    <span>Galerie</span>
                </div>
                <div className="services__galaxy-store">
                    <div className="services__galaxy-store__frame">
                        <img src="/assets/svg/basket.svg" alt="Icône du Galaxy Store" />
                    </div>
                    <span>Galaxy Store</span>
                </div>
                <div className="services__play-store">
                    <div className="services__play-store__frame">
                        <img src="/assets/svg/google_play.svg" alt="Icône du Play Store" />
                    </div>
                    <span>Play Store</span>
                </div>
                <div className="services__google-chrome">
                    <div className="services__google-chrome__frame">
                        <img src="/assets/svg/chrome.svg" alt="Icône Google Chrome" />
                    </div>
                    <span>Chrome</span>
                </div>
            </section>

            <div className="rounds">
                <div className="rounds__round"></div>
                <div className="rounds__round"></div>
                <div className="rounds__round"></div>
                <div className="rounds__round"></div>
            </div>

            <section className="utilities">
                <Link to="/appels"><img src="/assets/svg/telephone.svg" alt="Icône d'appel" /></Link>
                <Link to="/sms"><img src="/assets/svg/sms.svg" alt="Icône SMS" /></Link>
                <img src="/assets/svg/camera.svg" alt="Icône appareil photo" />
            </section>
        </main>
    );
}

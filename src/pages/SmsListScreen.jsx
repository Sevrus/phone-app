import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function SmsListScreen() {
    const [smsList, setSmsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/sms.json")
            .then(response => response.json())
            .then(data => {
                setSmsList(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur de récupération des SMS:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Chargement de vos messages...</div>;

    return (
        <div className="sms__container">
            {smsList.map((sms, index) => (
                <Link to={`/sms/${sms.htmlName}`} key={index} className="sms__container__item">
                    <div className="sms__container__item__avatar">
                        <img src={sms.image} alt={`Avatar de ${sms.name}`} />
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
    );
}

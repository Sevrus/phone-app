import { Link } from "react-router-dom";
import Header from "../components/Header";

const callsData = [
    {
        day: "Aujourd'hui",
        calls: [
            { id: 1, phone: "+33 7 21 59 86 34", name: "Maman", time: "02h28", type: "missed" }
        ]
    },
    {
        day: "Hier",
        calls: [
            { id: 2, phone: "+33 7 21 59 86 34", name: "Maman", time: "22h17", type: "missed" },
            { id: 3, phone: "+33 6 45 78 23 91", name: "Papa", time: "19h36", type: "missed" },
            { id: 4, phone: "9364 20578 2143", name: "Non enregistré", time: "19h12", type: "missed" },
            { id: 5, phone: "9364 20578 2143", name: "Non enregistré", time: "17h09", type: "missed" },
            { id: 6, phone: "9364 20578 2143", name: "Non enregistré", time: "14h59", type: "missed" },
            { id: 7, phone: "9364 20578 2143", name: "Non enregistré", time: "13h25", type: "missed" }
        ]
    },
    {
        day: "13 novembre",
        calls: [
            { id: 8, phone: "+33 7 21 59 86 34", name: "Maman", time: "22h39", type: "missed" },
            { id: 9, phone: "9364 20578 2143", name: "Non enregistré", time: "19h33", type: "missed" },
            { id: 10, phone: "9364 20578 2143", name: "Non enregistré", time: "17h41", type: "missed" }
        ]
    }
];

export default function CallListScreen() {
    return (
        <main>
            <Header />

            <div className="call-list-title">
                <h1 className="call-list-title__title">Liste d"appels</h1>
            </div>

            <section className="call-list">
                {callsData.map((dayGroup, index) => (
                    <div key={index}>
                        <h3 className="call-list__day">{dayGroup.day}</h3>

                        {dayGroup.calls.map(call => (
                            <div key={call.id} className="call-list__day__days">
                                <img src="/assets/svg/rate.svg" alt="Icône appel manqué" />

                                <div className="call-list__day__days__contact-details">
                                    <span className="call-list__day__days__contact-details__phone">
                                        {call.phone}
                                    </span>
                                    <span className="call-list__day__days__contact-details__name">
                                        {call.name}
                                    </span>
                                </div>
                                <span className="call-list__day__days__hours">{call.time}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </section>

            <footer className="footer">
                <Link to="/principal">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                </Link>
            </footer>
        </main>
    );
}

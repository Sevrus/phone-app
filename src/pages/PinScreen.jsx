import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PinScreen() {
    const [pinInput, setPinInput] = useState("");
    const [attempts, setAttempts] = useState(0);
    const navigate = useNavigate();

    const MAX_ATTEMPTS = 5;

    const handleDigitClick = (digit) => {
        setPinInput(prev => prev + digit);
    };

    const handleBackspace = () => {
        setPinInput(prev => prev.slice(0, -1));
    };

    const handleOkClick = () => {
        if (pinInput === import.meta.env.VITE_CORRECT_PIN) {
            navigate("/principal");
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= MAX_ATTEMPTS) {
                navigate("/error");
            } else {
                setPinInput("");
            }
        }
    };

    const remainingAttempts = MAX_ATTEMPTS - attempts;

    return (
        <main>
            <section className="main-pin">
                { pinInput.length === 0 ? (
                    <h2 className="main-pin__title">Entrez votre PIN</h2>
                ) : (
                    <input type="password" value={pinInput} readOnly />
                )}

                <p className="main-pin__instructions">
                    {attempts === 0
                        ? "Votre PIN contient 5 chiffres"
                        : `Il vous reste ${remainingAttempts} tentative${remainingAttempts > 1 ? "s" : ""}`}
                </p>

                <div className="main-pin__digits">
                    {[
                        { num: "1", letters: "" }, { num: "2", letters: "ABC" }, { num: "3", letters: "DEF" },
                        { num: "4", letters: "GHI" }, { num: "5", letters: "JKL" }, { num: "6", letters: "MNO" },
                        { num: "7", letters: "PQRS" }, { num: "8", letters: "TUV" }, { num: "9", letters: "WXYZ" }
                    ].map(key => (
                        <div
                            key={key.num}
                            className="main-pin__digits__digit"
                            onClick={() => handleDigitClick(key.num)}
                        >
                            <span className="main-pin__digits__digit--number">{key.num}</span>
                            {key.letters && <span className="main-pin__digits__digit--letters">{key.letters}</span>}
                        </div>
                    ))}

                    <div className="main-pin__digits__back" onClick={handleBackspace}>
                        <img src="/assets/svg/backspace.svg" alt="Retour" />
                    </div>

                    <div className="main-pin__digits__digit" onClick={() => handleDigitClick("0")}>
                        <span className="main-pin__digits__digit--number">0</span>
                    </div>

                    <div className="main-pin__digits__ok" onClick={handleOkClick}>
                        <span>OK</span>
                    </div>
                </div>
            </section>
        </main>
    );
}

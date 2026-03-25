import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const PhoneContext = createContext(null);

export function PhoneProvider({ children }) {
    const [battery, setBattery] = useState(30);
    const [time, setTime] = useState('');
    const [isShuttingDown, setIsShuttingDown] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const updateClock = () => {
            const date = new Date();
            setTime(date.toLocaleTimeString('fr-FR', {
                timeZone: 'Asia/Tokyo',
                hour: '2-digit',
                minute: '2-digit'
            }));
        };
        updateClock();
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const drainRate = 30000;

        const batteryInterval = setInterval(() => {
            setBattery((prev) => {
                const newBattery = prev - 1;
                if (newBattery <= 0) {
                    setIsShuttingDown(true);
                    setTimeout(() => navigate('/off'), 600);
                    return 0;
                }
                return newBattery;
            });
        }, drainRate);

        return () => clearInterval(batteryInterval);
    }, [navigate]);

    const recharge = () => {
        setBattery(100);
        setIsShuttingDown(false);
    };

    return (
        <PhoneContext.Provider value={{ battery, time, isShuttingDown, recharge }}>
            {children}
        </PhoneContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePhone = () => useContext(PhoneContext);

import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const PhoneContext = createContext(null);
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

export function PhoneProvider({ children }) {
    const [battery, setBattery] = useState(30);
    const [isCharging, setIsCharging] = useState(false);
    const [isShuttingDown, setIsShuttingDown] = useState(false);
    const [messages, setMessages] = useState([]);
    const [unreadSmsCount, setUnreadSmsCount] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const socketRef = useRef(null);

    // --- GESTION DU TEMPS (CHARGE / DÉCHARGE) ---
    useEffect(() => {
        if (isShuttingDown && !isCharging) return;

        const interval = setInterval(() => {
            setBattery((prevBattery) => {
                if (isCharging) {
                    if (prevBattery >= 100) {
                        return 100;
                    }
                    return prevBattery + 1;
                } else {
                    if (prevBattery <= 1) {
                        clearInterval(interval);
                        setIsShuttingDown(true);
                        if (!location.pathname.startsWith('/mj-control')) {
                            setTimeout(() => navigate('/off'), 600);
                        }
                        return 0;
                    }
                    return prevBattery - 1;
                }
            });
        }, 20000);

        return () => clearInterval(interval);
    }, [battery, isCharging, isShuttingDown, navigate, location.pathname]);

    // --- RECEPTION DES COMMANDES WEBSOCKET ---
    useEffect(() => {
        socketRef.current = io(SERVER_URL);

        socketRef.current.on('receive_mj_command', ({ type, payload }) => {
            const isMjPanel = location.pathname.startsWith('/mj-control');

            switch (type) {
                case 'SET_BATTERY':
                    setBattery(payload);
                    if (payload > 0) setIsShuttingDown(false);
                    break;

                case 'TOGGLE_CHARGING':
                    setIsCharging((prev) => {
                        const nextState = !prev;
                        socketRef.current.emit('mj_state_change', { isCharging: nextState });
                        return nextState;
                    });
                    setIsShuttingDown(false);
                    break;

                case 'KILL_BATTERY':
                    setBattery(0);
                    setIsCharging(false);
                    setIsShuttingDown(true);
                    if (!isMjPanel) setTimeout(() => navigate('/off'), 600);
                    break;

                case 'RECEIVE_SMS':
                    setMessages((prev) => [payload, ...prev]);
                    setUnreadSmsCount((prev) => prev + 1);

                    try {
                        const audio = new Audio('/assets/sounds/sms-notification.mp3');
                        audio.play().catch(() => {}); // Évite d'interrompre le script si l'audio est bloqué
                    } catch (e) {
                        // Ignorer si le fichier son est indisponible
                    }
                    break;

                case 'RESET_PHONE':
                    setBattery(100);
                    setIsCharging(false);
                    setIsShuttingDown(false);
                    setMessages([]);
                    setUnreadSmsCount(0);
                    if (!isMjPanel) navigate('/principal');
                    break;

                default:
                    break;
            }
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, [navigate, location.pathname]);

    return (
        <PhoneContext.Provider value={{
            battery, setBattery, isCharging, isShuttingDown,
            messages, unreadSmsCount, setUnreadSmsCount
        }}>
            {children}
        </PhoneContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePhone = () => useContext(PhoneContext);

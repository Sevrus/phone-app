import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CameraScreen() {
    const [showCreepyGif, setShowCreepyGif] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCreepyGif(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main style={{ backgroundColor: "black", position: "relative", overflow: "hidden" }}>
            <div style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                backgroundImage: "url(/assets/images/broken-glass.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 10,
                pointerEvents: "none",
                opacity: 0.8
            }} />

            {showCreepyGif ? (
                <div style={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    width: "100%", textAlign: "center", zIndex: 5, animation: "glitch 0.2s infinite"
                }}>
                    <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjlqNzV3dzBvMmZrNjVzbHA1cmxia2hkNHMyeHZ1NzY2YTg2OXMycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zq5r8cEBiQ0iC15kAS/giphy.gif" alt="Forêt" style={{ width: "100%", opacity: 0.7 }} />
                    <h2 style={{ color: "red", fontFamily: "monospace", fontSize: "20px", marginTop: "20px" }}>
                        I L S &nbsp; A R R I V E N T
                    </h2>
                </div>
            ) : (
                <p style={{ color: "white", position: "absolute", top: "50%", width: "100%", textAlign: "center" }}>
                    Chargement de l"appareil...
                </p>
            )}

            <Link to="/principal" style={{ position: "absolute", bottom: "20px", left: "20px", zIndex: 20 }}>
                <img src="/assets/svg/arrow-back.svg" alt="Retour" style={{ width: "40px", filter: "invert(1)" }} />
            </Link>
        </main>
    );
}

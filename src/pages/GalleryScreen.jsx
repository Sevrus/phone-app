import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

const galleryData = [
    { id: "d1", thumb: "/assets/thumbnail/disney1.jpg", full: "/images/full/fullDisney1.jpg" },
    { id: "d2", thumb: "/assets/thumbnail/disney2.jpg", full: "/images/full/fullDisney2.jpg" },
    { id: "d3", thumb: "/assets/thumbnail/disney3.jpg", full: "/images/full/fullDisney3.jpg" },
    { id: "d4", thumb: "/assets/thumbnail/disney4.jpg", full: "/images/full/fullDisney4.jpg" },
    { id: "d5", thumb: "/assets/thumbnail/disney5.jpg", full: "/images/full/fullDisney5.jpg" },
    { id: "d6", thumb: "/assets/thumbnail/disney6.jpg", full: "/images/full/fullDisney6.jpg" },
    { id: "d7", thumb: "/assets/thumbnail/disney7.jpg", full: "/images/full/fullDisney7.jpg" },
    { id: "d8", thumb: "/assets/thumbnail/disney8.jpg", full: "/images/full/fullDisney8.jpg" },
    { id: "t1", thumb: "/assets/thumbnail/tokyo1.jpg", full: "/images/full/fullTokyo1.jpg" },
    { id: "t2", thumb: "/assets/thumbnail/tokyo2.jpg", full: "/images/full/fullTokyo2.jpg" },
    { id: "t3", thumb: "/assets/thumbnail/tokyo3.jpg", full: "/images/full/fullTokyo3.jpg" },
    { id: "t4", thumb: "/assets/thumbnail/tokyo4.jpg", full: "/images/full/fullTokyo4.jpg" },
    { id: "t5", thumb: "/assets/thumbnail/tokyo5.jpg", full: "/images/full/fullTokyo5.jpg" },
    { id: "t6", thumb: "/assets/thumbnail/tokyo6.jpg", full: "/images/full/fullTokyo6.jpg" }
];

export default function GalleryScreen() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <main>
            <Header />

            <div className="gallery-title">
                <h1 className="gallery-title__title">Galerie</h1>
            </div>

            <section className="gallery">
                <div className="gallery__thumbnails">
                    {galleryData.map((image) => (
                        <img
                            key={image.id}
                            src={image.thumb}
                            alt="Miniature"
                            onClick={() => setSelectedImage(image.full)}
                            style={{ cursor: "pointer" }}
                        />
                    ))}
                </div>
            </section>

            {selectedImage && (
                <div
                    className="gallery-modal"
                    onClick={() => setSelectedImage(null)}
                    style={{
                        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                        backgroundColor: "rgba(0,0,0,0.9)", display: "flex",
                        justifyContent: "center", alignItems: "center", zIndex: 1000
                    }}
                >
                    <img
                        src={selectedImage}
                        alt="Plein écran"
                        style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain" }}
                    />
                </div>
            )}

            <footer className="footer">
                <Link to="/principal">
                    <img src="/assets/svg/arrow-back.svg" alt="Flèche retour" />
                </Link>
            </footer>
        </main>
    );
}

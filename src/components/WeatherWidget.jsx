import { useState, useEffect } from "react";

const weatherIcons = {
    "Thunderstorm": "wi wi-thunderstorm",
    "Drizzle": "wi wi-sleet",
    "Rain": "wi wi-rain",
    "Snow": "wi wi-snow",
    "Clear": "wi wi-day-sunny",
    "Clouds": "wi wi-cloudy",
    "Mist": "wi wi-fog",
    "Dust": "wi wi-dust",
    "Fog": "wi wi-fog"
};

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}&units=metric&lang=fr`);
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de la météo :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) return <section className="meteo">Chargement...</section>;
    if (!weather) return <section className="meteo">Erreur météo</section>;

    const conditions = weather.weather[0].main;
    const description = weather.weather[0].description;

    const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);

    return (
        <section className="meteo">
            <h1 className="meteo__city">{weather.name.slice(-5)}</h1>
            <i className={`wi ${weatherIcons[conditions] || "wi-day-sunny"}`}></i>
            <h2>
                <span className="meteo__temperature">{Math.round(weather.main.temp)}</span> °C
                <br />
                (<span className="meteo__description">{formattedDescription}</span>)
            </h2>
        </section>
    );
}

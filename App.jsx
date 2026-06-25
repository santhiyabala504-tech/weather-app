import { useState } from "react";
import "./style.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "5ea764af6dc7eee0b079a9d113f66729";

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message || "City not found");
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("Something went wrong. Check internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🌦️ Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
        />

        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p className="info">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather && weather.main && (
        <div className="card">
          <h2>{weather.name}</h2>

          <div className="details">
            <p>🌡 Temperature: {weather.main.temp}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>☁ Condition: {weather.weather[0].description}</p>
            <p>🌬 Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

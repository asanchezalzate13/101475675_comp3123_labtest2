// src/WeatherDisplay.js

import React from 'react';

function WeatherDisplay({ data }) {
    if (!data) return null; // Should not happen, but safe check
    const { name, main, weather, wind } = data;
    const tempInCelsius = Math.round(main.temp);
    const description = weather[0].description;
    const iconCode = weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div className="weather-card">
            <h2 className="city-name">{name}</h2>
            <div className="main-info">
                <img src={iconUrl} alt={description} className="weather-icon" />
                <span className="temperature">{tempInCelsius}°C</span>
                <p className="description">{description.toUpperCase()}</p>
            </div>

            {/* Display Additional Required Information [cite: 43] */}
            <div className="details">
                <p>Humidity: <span>{main.humidity}%</span></p>
                <p>Wind Speed: <span>{wind.speed} m/s</span></p>
                <p>Max Temp: <span>{Math.round(main.temp_max)}°C</span></p>
                <p>Min Temp: <span>{Math.round(main.temp_min)}°C</span></p>
            </div>
        </div>
    );
}

export default WeatherDisplay;
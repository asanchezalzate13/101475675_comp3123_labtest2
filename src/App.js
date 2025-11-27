// src/App.js

import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import './App.css';
const API_KEY = '7b032272925189ee92e74704751d2cda';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [city, setCity] = useState('Toronto');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return; // Do not fetch if city is empty

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('City not found. Please try again.');
        }

        const data = await response.json();
        setWeatherData(data); // Store the successful data
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchWeather();

  }, [city]); // Dependency Array: This effect runs when the component mounts and whenever the 'city' state changes.


  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchInput.trim() !== '') {
      setCity(searchInput.trim());
      setSearchInput(''); // Clear the input field
    }
  };

  return (
      <div className="weather-app-container">
        <h1>Weather App</h1>
        <input
            type="text"
            placeholder="Enter City Name and press Enter"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleSearch}
            className="search-input"
        />

        {/* Conditional Rendering of Status/Data */}

        {loading && <p className="status-message">Loading weather data...</p>}

        {error && <p className="error-message">Error: {error}</p>}

        {/* Render the WeatherDisplay component, passing the data as a prop  */}
        {weatherData && !loading && <WeatherDisplay data={weatherData} />}

      </div>
  );
}

export default App;
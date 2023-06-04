// Weather app project by Armand Botha, Aluta Jakuja, Gregory Avvakoumides, Stefan Du Toit, Tiaan van Rooyen

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

  //api url
  const url = `/weather/${zipCode}`;

  const searchZip = async (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError('');
          console.log(response.data);
        })
        .catch((error) => {
          setError('ZIP code not found');
          console.log(error);
        });
      setZipCode('');
    }
  };
  const getBackgroundClass = (weatherCondition) => {
    if (!weatherCondition) return "default-background";

    const classes = {
      Clouds: "cloudy-background",
      Rain: "rainy-background",
      Clear: "sunny-background"
    };
    return classes[weatherCondition] || "default-background";
  };
  return (
    <div className={`app ${data.weather ? getBackgroundClass(data.weather[0].main) : "default-background"}`}>
      <div className="search">
        <input
          value={zipCode}
          onChange={(event) => setZipCode(event.target.value)}
          onKeyPress={searchZip}
          placeholder="Enter Zip Code"
          type="text"
        />
      </div>
      <div className="container">
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : (
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
        )}

        {data.name !== undefined && !error && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KM/H</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


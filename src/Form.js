import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import WeatherIcon from "./WeatherIcon.js";
import ConvertDate from "./ConvertDate.js";
import Forecast from "./Forecast.js";

export default function Form() {
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [city, setCity] = useState("Tehran");

  function handleResponse(response) {
    console.log(response.data.daily);
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  }

  function submitSearch(event) {
    event.preventDefault();
    search();
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  function search() {
    let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
  }
  //------------------------------------
  if (weatherData.ready) {
    return (
      <div>
        <form className="mb-3" onSubmit={submitSearch}>
          <div className="row">
            <div className="col-9">
              <input
                onChange={updateCity}
                type="search"
                placeholder="Type a city.."
                className="form-control"
                autoFocus="on"
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
          <br />
        </form>
        <div>
          <h2>
            <strong>{weatherData.city}</strong>
          </h2>
          <div className="row">
            <div className="col-6">
              <div className="weather-temperature justify-content-end">
                <WeatherIcon
                  className="icon"
                  code={weatherData.icon}
                  size={74}
                />
                <span className="degree">{weatherData.temperature}</span>
                <span className="Wdegree">°C</span>
              </div>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <ConvertDate dati={weatherData.date} />
                </li>
                <li className="text-capitalize">{weatherData.description}</li>
                <li>
                  <strong>Humidity:</strong> {weatherData.humidity}%,{" "}
                  <strong>Wind: </strong>
                  {weatherData.wind}km/h
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Forecast
          coordinates={weatherData.coordinates}
          cit={weatherData.city}
        />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}

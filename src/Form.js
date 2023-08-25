import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import WeatherIcon from "./WeatherIcon.js";
import ConvertDate from "./ConvertDate.js";

export default function Form(props) {
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [city, setCity] = useState("Tehran");

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
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
    let unit = "metric";
    let apiKey = "52762f86df418f479f71739bf7d198db";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
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
                autofocus="on"
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
        <h2>
          <strong>{weatherData.city}</strong>
        </h2>
        <div className="row">
          <div className="col-6">
            <div className="weather-temperature justify-content-end">
              <WeatherIcon code={weatherData.icon} />
              <strong className="degree">{weatherData.temperature}</strong>
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
    );
  } else {
    submitSearch();
    return "Loading...";
  }
}

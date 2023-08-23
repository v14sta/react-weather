import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
export default function Form() {
  let [city, setCity] = useState("");
  let [text, setText] = useState("Tehran");
  let [date, setDate] = useState("Wednesday");
  let [temperature, setTemperature] = useState("34");
  let [humidity, setHumidity] = useState(null);
  let [description, setDescription] = useState("Sunny");
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(
    "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/094/367/original/icons8-weather-100.png?1692794386"
  );

  //----------------------------------
  function weatherAtr(response) {
    setDescription(response.data.weather[0].description);
    setWind(response.data.wind.speed);
    setTemperature(Math.round(response.data.main.temp));
    setHumidity(response.data.main.humidity);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function submitSearch(event) {
    event.preventDefault();
    let tempCity = `${city}`;
    setText(tempCity);
    let unit = "metric";
    let apiKey = "52762f86df418f479f71739bf7d198db";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(url).then(weatherAtr);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  //------------------------------------
  return (
    <form className="mb-3" onSubmit={submitSearch}>
      <div className="row">
        <div className="col-9">
          <input
            onChange={updateCity}
            type="search"
            placeholder="Type a city.."
            className="form-control"
            autoComplete="off"
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
      <h2>
        <strong>{text}</strong>
      </h2>
      <div className="row">
        <div className="col-6">
          <div className="weather-temperature justify-content-end">
            <img src={icon} alt={description} className="float-left image" />
            <strong className="degree">{temperature}</strong>
            <span className="Wdegree">°C</span>
          </div>
        </div>
        <div className="col-6">
          <ul>
            <li>
              {date}, {description}
            </li>
            <li>
              <strong>Humidity:</strong> {humidity}%, <strong>Wind: </strong>
              {wind}km/h
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}

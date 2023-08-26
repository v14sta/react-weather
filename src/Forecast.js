import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import ForecastDay from "./ForecastDay.js";

export default function Forecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
    //console.log(response.data.daily);
  }
  function load() {
    let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.cit}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (loaded) {
    //console.log(forecast);
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (day, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <ForecastDay data={day} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    load();
    return null;
  }
}

import React from "react";
import "./styles.css";
export default function ConvertDate(props) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[props.dati.getDay()];
  let hours = props.dati.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = props.dati.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return (
    <div>
      {day} {hours}:{minutes}
    </div>
  );
}

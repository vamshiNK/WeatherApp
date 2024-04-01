import React, { useState } from "react";
import "../WeatherApp/WeatherApp.css";
import "bootstrap/dist/css/bootstrap.css";

import search_icon from "../Assests/search.png";
import cloud_icon from "../Assests/cloud.png";
import humidity_icon from "../Assests/humidity.png";
import wind_icon from "../Assests/wind.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import clear_icon from "../Assests/clear.png";
const WeatherApp = () => {
  let api_key = "e594500b2dfe2e9fa53763f7f6f18222"; // API key for openweathermap API
  const [wicon, setWicon] = useState(cloud_icon); //default icon is a cloud when the app loads

  const search = async () => {
    const element = document.getElementsByClassName("cityname");
    if (element[0].value === "") {
      return 0;
    }
    console.log(element[0].value);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();

      const humidity = document.getElementsByClassName("himidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      console.log(data);

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
      location[0].innerHTML = data.name + ", " + data.sys.country;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weahter[0].icon === "09d" ||
        data.weahter[0].icon === "09n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityname"
          id="city-input"
          placeholder="City"
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="wetheraimage">
        <img src={wicon} alt="" srcset="" />
      </div>
      <div className="weather-temp">°C</div>
      <div className="weather-location"> Location</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" srcset="" />
          <div className="data">
            <div className="himidity-percent">%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" srcset="" />
          <div className="data">
            <div className="wind-rate">Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

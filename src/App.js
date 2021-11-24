import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");
  //el use effect es para siempre que algo cambie, se actualice solo
  //cuando la pagina se cargue llamamos, obtenemos los datos de la api
  //el .then es para obtener los datos
  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=1df3ea496ec64262a8d83056212411&q=London&aqi=no"
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //event
  const weatherInput = (e) => {
    setInput(e.target.value);
  };
  const searchWeather = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=1df3ea496ec64262a8d83056212411&q=${input}&aqi=no`
      )
      .then((data) => {
        setWeather(data.data);
      });
  };
  //cuando el weather ya tiene valor
  return (
    <div className="weather-container">
      {weather && (
        <div>
          <h1>Weather Info</h1>
          <p>Search the city you want to know the weather</p>
          <div className="search">
            <input type="text" onChange={weatherInput} />
            <button onClick={searchWeather}>Search</button>
          </div>
          <div className="weather-info">
            <h2>
              {weather.location.name} - {weather.location.region}
            </h2>

            <div className="weather-temperature">
              <h3>{weather.current.condition.text}</h3>
              <img src={weather.current.condition.icon} alt="" />
              <h3>{weather.current.temp_c}° Celsius</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

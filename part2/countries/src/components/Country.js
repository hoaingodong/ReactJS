import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {

  const [weather, setWeather] = useState("");
  const api_key = process.env.REACT_APP_API_KEY
  const weather_api = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital},uk&APPID=${api_key}`;
  console.log(api_key);

  useEffect(() => {
    axios.get(weather_api).then((response) => {
      setWeather(response.data);
    });
  }, []);

  console.log(weather);
  
  return (
    <div>
      <h2>{country.name.official}</h2>
      <div>
        <div>Capital {country.capital}</div>
        <div>Population {country.population}</div>
      </div>
      <div>
        <h3>Languages</h3>
        {Object.values(country.languages).map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </div>
      <br/>
      <div>
        <img src={country.flags.png} alt="Country Flag" width="10%" />
      </div>
      <h2>Weather in {country.capital}</h2>
      {/* <p><b>Temperature: </b> {weather['weather'].temp} Celcius</p> */}
      {/* <img src={weather['weather'].icon[0]} alt='weather icon' />
      <p><b>wind: </b> {weather['weather'].wind_speed} kph direction {weather['current'].wind_dir}</p> */}
    </div>
  );
};

export default Country;

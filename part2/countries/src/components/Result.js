import axios from "axios";
import React, { useEffect } from "react";

import Country from "./Country";

const Result = ({ countries, setCountries, searchName, showCountry }) => {
  const url = `https://restcountries.com/v3.1/name/${searchName}`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setCountries(response.data);
    });
  });

  return (
    <div>
      {countries.length === 1 && <Country country={countries[0]}></Country>}
      {countries.length >= 2 && countries.length <= 10 && (
        <div>
          {countries.map((country, index) => {
            return (
              <div key={index}>
                <span>{country.name.official}</span>
                <button
                  type="button"
                  value={country.name.official}
                  onClick={showCountry}
                >
                  show
                </button>
                <br />
              </div>
            );
          })}
        </div>
      )}

      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  );
};
export default Result;

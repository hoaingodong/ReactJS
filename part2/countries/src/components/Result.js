import Country from "./Country";

const Result = ({ countries, showCountry, searchName }) => {

  const listcountries = countries.filter(country =>
    country.name.official.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      {listcountries.length === 1 && <Country country={listcountries[0]}></Country>}
      {listcountries.length >= 2 && listcountries.length <= 10 && (
        <div>
          {listcountries.map((country, index) => {
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

      {listcountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  );
};
export default Result;

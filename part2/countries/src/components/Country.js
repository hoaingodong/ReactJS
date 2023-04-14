const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name.official}</h2>
      <div>
        <div>Capital {country.capital}</div>
        <div>Population {country.population}</div>
      </div>
      <div>
        <h3>Languages</h3>
        {
          Object.values(country.languages).map((e, i) => <li key={i}>{e}</li>)
        }
      </div>
      <br />
      <div>
        <img src={country.flags.png} alt="Country Flag" width="10%" />
      </div>
    </div>
  )
}

export default Country 
const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (country.length === 0) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{country.name.common} </h3>
            <div>capital {country.capital[0]} </div>
            <div>population {country.population}</div>
            <img src={country.flag} height='100' alt={`flag of ${country.name.common}`}/>
        </div>
    )
}

export default Country
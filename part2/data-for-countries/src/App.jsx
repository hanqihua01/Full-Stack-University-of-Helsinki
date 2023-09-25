import { useEffect, useState } from "react";
import countryService from "./services/countries";

const Countries = ({ countries, countryFilter, setCountryFilter }) => {
  const flagStyle = {
    fontSize: 100
  };

  const filteredCountries = countries.filter((country) =>
    country.name.official.toLowerCase().includes(countryFilter.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h1>{country.name.official}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>

        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <div style={ flagStyle }>{country.flag}</div>
      </div>
    );
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.official}>
            {country.name.official}
            <button onClick={() => setCountryFilter(country.name.official)}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const [countryFilter, setCountryFilter] = useState("");

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  return (
    <div>
      find countries <input value={countryFilter} onChange={handleCountryFilterChange} />
      <Countries countries={countries} countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
    </div>
  );
}

export default App;
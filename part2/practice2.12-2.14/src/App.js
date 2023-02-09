import { useEffect, useState } from 'react'
import axios from 'axios';

const Search = (props) => {
  return (
    <div>
      <p>find countries
        <input value={props.value} onChange={props.onChange} />
      </p>
    </div>
  )
}

const Information = (props) => {
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>capital {props.country.capital[0]}</p>
      <p>area {props.country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(props.country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={props.country.flags.png} alt="flag" />
    </div>
  )
}

const Countries = (props) => {
  const handleShow = (commonName) => {
    props.setSearchCountry(commonName)
  }

  if (props.countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if (props.countries.length > 1) {
    return (
      <ul>
        {props.countries.map(country =>
          <li key={country.name.official}>
            {country.name.common}
            <button onClick={() => handleShow(country.name.common)}>show</button>
          </li>
        )}
      </ul>
    )
  } else if (props.countries.length === 1) {
    return (
      <Information country={props.countries[0]} />
    )
  } else {
    return <p>No matches</p>
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
  }

  const countriesToShow = searchCountry === ''
    ? countries
    : countries.filter(country =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    )

  return (
    <div>
      <Search value={searchCountry} onChange={handleSearchCountry} />
      <Countries countries={countriesToShow} setSearchCountry={setSearchCountry} />
    </div>
  );
}

export default App;
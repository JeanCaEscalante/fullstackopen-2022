import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './component/Country';
function App() {
  const [filter,setFilter] = useState('');
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState({});

  useEffect(() => {

    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data.map(({name,capital,languages,area,population,flags}) => ({name:name.common,capital,languages,area,population,flags})))
      })
  }, [])

  const handleFilterChange = (event) => {
    setCountry({}) 
    setFilter(event.target.value)
  }



  const filterCountries = countries.filter(country => country.name.toLowerCase().includes(filter))

  const showCountry = name => () => 
        setCountry(
                filterCountries.filter((country) => country.name.includes(name))[0]
                )

  return (
    <div className="App">
        <div>
          Find countries <input value={filter} onChange={handleFilterChange}/>
        </div>
        {(filterCountries.length > 10) && <p>Too many matches, specify another filter</p> }
        
        {(filterCountries.length < 10 && filterCountries.length > 1 ) 
          &&                                  <table>
                                                <tbody>
                                              {filterCountries.map((value) => 
                                                  <tr key={value.name}>
                                                    <td>
                                                      {value.name}
                                                    </td>
                                                    <td>
                                                      <button onClick={showCountry(value.name)}>Show</button>
                                                    </td>
                                                  </tr>
                                               )}</tbody>
                                              </table>
        }

                    {(filterCountries.length === 1) && <Country country={filterCountries[0]} /> }


                    { (country.name) &&  <Country country={country} />}
    </div>
  );
}

export default App;

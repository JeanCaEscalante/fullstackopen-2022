import React, {useState, useEffect} from "react";
import axios from "axios";

const Country = ({country}) => {
  const [weather,setWeather] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {

    const params = {
      q:country.name,
      appid:api_key,
      units:'metric'
    }


    axios.get('https://api.openweathermap.org/data/2.5/weather', {params})
    .then(response => {
      console.log(response.data)
     
          setWeather(response.data)
    })

  }, [])

    return (  
      <>
      
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
          <p>poblation: {country.population}</p>
          <p>area: {country.area}</p>
          <h2>Languaje</h2>
            <ul>{Object.values(country.languages).map((language) => <li key={language}>{language}</li> )}</ul>

          <img src={country.flags.png} />  

          <h2>Weather {country.name}</h2>
          <p>Temperature: {weather['main']['temp']} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather['weather'][0]['icon']}@2x.png`} />
          <p>wind: {weather['wind']['speed']} m/s</p>
      </>)
    
  }
  
  export default Country
import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

const API_KEY = "1fa2925aab8989ca616a3ba20ccadbc7"

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temps, setTemps] = useState()
  const [isCelsius, setIsCelsius] = useState(true)

  const success = (e) =>{
    console.log(e)
    const newCoords = {
      lat: e.coords.latitude,
      lon: e.coords.longitude
    }
    setCoords(newCoords)
  }

  const changeUnitsTemps = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect(() => {
    if(coords){
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
      .then(res => {
        setWeather(res.data)
        const celsius = (res.data.main.temp - 273.15).toFixed(2);
        const fahrenheit = (celsius * (9/5) + 32).toFixed(2);
        const newTemps = {celsius, fahrenheit}
        setTemps(newTemps)
      })
      .catch(err => console.log(err))
    }    
  },[coords])
  
  return (
    <div className='Application'>
      <WeatherCard weather={weather} temps={temps} isCelsius={isCelsius} changeUnitsTemps={changeUnitsTemps}/>
    </div>    
  )
}

export default App

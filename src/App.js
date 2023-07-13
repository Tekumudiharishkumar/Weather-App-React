import React, { useState, useEffect } from "react"
import axios from "axios"
import 'moment-timezone';
import moment from "moment";

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=987ba6fad6e367c1ea8b0db8ede0468a`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        setLocation('')
        getTime(response.data.timezone);

      })
        .catch(function (error) {
          console.log(error);
          setData("");
          setLocation("");
          alert("Sorry , City not found!!!");
        });
    }
  }

  function getTime(timeZone) {
    const targetTimeZoneOffset = timeZone; 
    const targetTime = moment().utcOffset(targetTimeZoneOffset / 60).format('MMM Do hh:mm:ss a');
    setTime(targetTime);
  }

  useEffect(() => {
    const timer = setInterval(()=>{
      setTime(prevTime => {
        const formattedTime = moment(prevTime, 'MMM Do hh:mm:ss a').add(1, 'seconds').format('MMM Do hh:mm:ss a');
        return formattedTime;
      });
    } , 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="app">
      <div className="search">
        <p><strong>Weather App</strong></p>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {data.name !== undefined &&
        <div className="container">
          <div className="top">
            <div className="location">
              <p className="time">{time}</p>
              <p className="city">{data.name} , {data.sys.country}</p>
            </div>
            <div className="temp">
              <div>
                <h1>{data.main.temp.toFixed()}°C</h1>
              </div>
              <div>
                <img className="icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                <p className="description" >{data.weather[0].main}</p>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>

            </div>
            <div className="wind">
              <p className="bold">{data.wind.speed}MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      }


    </div>

  );
}

export default App;




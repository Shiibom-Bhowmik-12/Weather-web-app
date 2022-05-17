import React,{useState,useEffect} from 'react';
import axios from 'axios';
// import Main from './Components/main';


function App() {

  const [data,setData]=useState({});
  const [location,setLocation] = useState('');
  document.title="Weather App";


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=731e09a0cd8c5445156ebe7226617e00`;

  const searchLocation = (event) =>{
    if(location == ''){
      alert('Please enter a location!');
    }
    else{
      axios.get(url).then((response) =>{
        setData(response.data);
        // console.log(response.data);
        // setLocation('');
      })
    }
  }

  const icon= data.weather ? data.weather[0].icon : null;
  const linkk= `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="app">
      <div className="search">
        <input  type="text" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Enter location to search" />
        <button className="btn" type="button" onClick={searchLocation}>Search</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name} {data.sys ? <p>{data.sys.country}</p> : null}</p>
          </div>
          <div className="temp">
            {data.main?<h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="icon">
            {
              location != '' && <img src={linkk} alt='iconi' />
            }
          </div>
          <div className="description">
            {data.weather? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

      {data.name !== undefined && 
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()} °C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity}</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed.toFixed()}</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
       }

      </div>
    </div>
  );
}

export default App;

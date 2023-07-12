import Hot from "./Asserts/hot.webp";
import Cool from "./Asserts/cool.jpeg";
import Descriptions from "./Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {

  const [city, setCity] = useState("paris")
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric")
  const [bg,setBg] = useState(Hot)
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city,units);
      setWeather(data);

      //dynamic background
      const threshold = units === 'metric' ? 20 : 60;
      if(data.temp <= threshold) setBg(Cool)
      else setBg(Hot)
    };
    fetchWeatherData();
  }, [units,city]);

  function handleUnitClick(e){
    //get inner button value by currentTarget
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : "°C"
    setUnits(isCelsius ? "metric" : "imperial")
  }



  const enterKeyPressed = (e)=>{
    
    if(e.keyCode === 13){
      setCity(e.currentTarget.value)
    }
  }
  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input onKeyDown = {enterKeyPressed} type="text" name="city" placeholder="Enter City..." />
              <button onClick={(e)=>handleUnitClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} ° ${units === "metric" ? "C" : "F"}`}</h1>
              </div>
            </div>

            {/* {bottom description}  */}
            <Descriptions weather={weather} units = {units}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

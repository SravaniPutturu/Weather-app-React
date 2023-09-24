import Hot from "./Asserts/hot.webp";
import Cool from "./Asserts/cool.jpeg";
import Descriptions from "./Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  // State variables
  const [city, setCity] = useState("paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(Hot);
  const [showWeather, setShowWeather] = useState(false); // To control whether to show weather data

  // Function to fetch weather data when city or units change
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);

      console.log(data)
      if (data === undefined) {
        setShowWeather(false)
        return;
      }

      // Set weather data and showWeather to true when data is available
      setWeather(data);
      setShowWeather(true);

      // Dynamic background
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(Cool);
      else setBg(Hot);
    };
    fetchWeatherData();
  }, [units, city]);

  // Function to handle unit toggle button click
  function handleUnitClick(e) {
    // Get inner button value by currentTarget
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  }

  // Function to handle Enter key press in the input field
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {showWeather ? (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} ° ${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            {/* {bottom description} */}
            <Descriptions weather={weather} units={units} />
          </div>) : <h3  ><a href="#" onClick={()=>setShowWeather(true)}>Data not available for the specified city.</a></h3>
        }
      </div>
    </div>
  );
}

export default App;

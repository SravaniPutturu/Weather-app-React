const API_KEY = "5a636bd1aa58fce26629d11583ba73fc";

// Function to generate the URL for the weather icon
const makeIconUrl = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

// Function to fetch and format weather data
const getFormattedWeatherData = async (city, units = "metric") => {
  try {
    // Construct the API URL with the provided city and units
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    // Fetch weather data from the API
    const response = await fetch(URL);

    // Check if the network response is okay
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON response data
    const data = await response.json();

    // Extract relevant information from the data
    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data;

    // Extract the description and icon ID from the weather array
    const { description, icon } = weather[0];

    // Format and return the weather data
    return {
      description,
      iconURL: makeIconUrl(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  } catch (error) {
    // Handle errors here (e.g., log the error)
    console.error("Error fetching weather data:", error);

    // Return a default or undefined value to indicate an error condition
    return undefined;
  }
};

export { getFormattedWeatherData };

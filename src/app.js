// Function to format timestamp
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// Function to display current weather
function displayTemperature(response) {
  console.log(response);
    let temperatureElement=document.querySelector("#temperature");
    let CityElement=document.querySelector("#city");
    let DescriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let feelslikeElement=document.querySelector("#feelslike");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector(
        "#weather_icon"
    )
    
    temperatureElement.innerHTML=Math.round(response.data.temperature.current);
    CityElement.innerHTML=response.data.city;
    DescriptionElement.innerHTML=response.data.condition.description;
    humidityElement.innerHTML=response.data.temperature.humidity;
    feelslikeElement.innerHTML=Math.round(response.data.temperature.feels_like);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.time);
    
    iconElement.innerHTML= `<img
                    class="icon"
                    src="${response.data.condition.icon_url}";
                  />`
  get_forecast(response.data.city);
}


function searchCity(city) {
  let apiKey = `893fc75a240abbc6oc34eddd57f08bta`; // Replace with your API key
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl)
    .then(displayTemperature)
    .catch(error => {
      if (error.response && error.response.status === 404) {
        alert("City not found");
      } else {
        alert("An error occurred. Please try again later.");
      }
    });
}

// Event listener for form submission
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = searchInput.value.trim();

  if (city) {
    searchCity(city);
  } else {
    alert("Please enter a city");
  }
}


//GETTING DATA OF THE CURRENT LOCATION

function searchLocation(position) {
  let apiKey = `893fc75a240abbc6oc34eddd57f08bta`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl)
    .then(displayTemperature)
    .catch(error => {
      if (error.response && error.response.status === 404) {
        alert("City not found");
      } else {
        alert("An error occurred. Please try again later.");
      }
    });
}


function getCurrentLocation(event) {
  event.preventDefault();
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(searchLocation);
  } else {
    alert("Geolocation is not available in this browser.");
  }
}

let currentLocationButton = document.querySelector("#currentbtn");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Event listener for search form submission
let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Adding an event listener to both temperature units
let unitToggleCelsius = document.querySelector("#cel");
let unitToggleFahrenheit = document.querySelector("#fah");

unitToggleCelsius.addEventListener("click", toggleTemperatureUnit);
unitToggleFahrenheit.addEventListener("click", toggleTemperatureUnit);

function toggleTemperatureUnit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature = parseFloat(temperatureElement.innerHTML);

  // Checking the clicked unit and convert to the opposite
  if (event.target.id === "cel") {
    // Converting to Celsius
    let celsiusTemperature = ((currentTemperature - 32) * 5) / 9;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    unitToggleCelsius.classList.add("active");
    unitToggleFahrenheit.classList.remove("active");
  } else {
    // Converting to Fahrenheit
    let fahrenheitTemperature = (currentTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    unitToggleFahrenheit.classList.add("active");
    unitToggleCelsius.classList.remove("active");
  }
}

// Function to fetch and display forecast

function dayFormat(time) {
  let date = new Date(time * 1000);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[date.getDay()];
}

function get_forecast(city) {
  let apiKey = `893fc75a240abbc6oc34eddd57f08bta`;
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(url).then(forecast);
}

function forecast(response) {
  console.log(response.data);
  let forecastHtml = "<div class='row'>";
  response.data.daily.forEach(function (day, index) {
    if (index <= 4) {
      let forecast = document.querySelector("#forecast");
      forecastHtml += `
      <div class="col">
      <div class="forecast-day">
      <div class="forecast-date">${dayFormat(day.time)}</div>
        <div><img src ="${day.condition.icon_url}"class="forecast-icon"></div>
          <div class="forecast-temp">
            <span class="max">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </span>
            <span class="min">${Math.round(
              day.temperature.minimum
            )}°</span>
      </div>
      </div>
    </div>
 `;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

// Initial load with a default city (London)
searchCity("London");

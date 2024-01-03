//function to receive a timestamp
function formatDate(timestamp){
    //calculate the date
    let date=new Date();
    let hours=date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday", "Friday", "Saturday"];
    let day=days[date.getDay()];
    return `${day} ${hours} : ${minutes}`;
}




//Defining a function that I want axios to call when I get the response back from the api
function displayTemperature(response){
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
    
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    CityElement.innerHTML=response.data.name;
    DescriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    feelslikeElement.innerHTML=Math.round(response.data.main.feels_like);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt);
    
    iconElement.innerHTML= `<img
                    class="icon"
                    src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png";
                  />`
  getForecast(response.data.name);
}




// Loading default city (Bhubaneswar) on page load
searchCity("Bhubaneswar");
function searchCity(city) {
  let apiKey="ef536c135f931c48635e435d71067995";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature)
  
.catch(error => {
            if (error.response.status === 404) {
                alert("City not found");
            } else {
                alert("An error occurred. Please try again later.");
            }
        });
  
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");
  let city = searchInput.value;
  if (city) {
    searchCity(city);
  } else {
    alert("Please type a city");
  }
}

let searchFormElement =document.querySelector(".search-form"); 
searchFormElement.addEventListener("submit", handleSearchSubmit);

//GETTING DATA OF THE CURRENT LOCATION
function searchLocation(position) {
  let apiKey = "ef536c135f931c48635e435d71067995";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
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

function getForecast(city) {
  let apiKey = "ef536c135f931c48635e435d71067995";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}


function formatDay(timestamp){
  let date=new Date(timestamp*1000);
  let days=["Sunday","Monday","Tuesday","Wednesday","Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}


function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "<div class='row'>";
  let days = [];
  response.data.list.forEach(function (day) {
    let forecastDay = formatDay(day.dt);
    // Checking if the day is not already added and limit it to 5 unique days
    if (!days.includes(forecastDay) && days.length < 5) {
      days.push(forecastDay);
      forecastHtml +=
        `<div class="col">
          <div class="day">${forecastDay}</div>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png"  class="forecast-icon"/>
          <div class="forecast-temp">
            
          <strong class="max">${Math.round(day.main.temp_max)}°</strong>
            <strong class="min">${Math.round(day.main.temp_min)}°</strong>
          </div>
        </div>`;
    }
  });
  forecastHtml += "</div>";
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}


 displayForecast();
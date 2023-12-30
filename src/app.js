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
    
}




// Loading default city (Mumbai) on page load
searchCity("London");
function searchCity(city) {
  let apiKey="ef536c135f931c48635e435d71067995";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
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

/*let apiKey="ef536c135f931c48635e435d71067995";
let city="London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
//fetching the results of the api in javascript using axios
axios.get(apiUrl).then(displayTemperature);
*/

//changing the h1 to a searched city
/*
function handleSearchSubmit(event) { 
  event.preventDefault();
let searchInput =document.querySelector(".search-form-input"); 
let cityElement2=document.querySelector("#city");
cityElement2.innerHTML =searchInput.value;
}*/

let searchFormElement =document.querySelector(".search-form"); 
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
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let dayz = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "<div class='row'>";
  dayz.forEach(function (day) {
    forecastHtml +=
      `<div class="col">
        <div class="day">${day}</div>
        <img src="src/sun.png" alt="icon" width="20" />
        <div class="forecast-temp">
          <span class="min">15°</span>
          <span class="max">18°</span>
        </div>
      </div>`;
  });
  forecastHtml += "</div>";
  forecastElement.innerHTML = forecastHtml;
}


 displayForecast();
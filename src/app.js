//function to receive a timestamp
function formatDate(timestamp){
    //calculate the date
    let date=new Date(timestamp);
    let hours=date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    let days=["Sunday","Monday","Tuesday","Wednesday","Thu"]
    let day=days[date.getDay()];
    return `${day} ${hours} : ${minutes}`;
}

//Defining a function that I want axios to call when I get the response back from the api
function displayTemperature(response){
    console.log(response.data);//Axios puts the actual object inside the response.data(whole object)
    //console.log(response.data.main.temp);
    let temperatureElement=document.querySelector("#temperature");
    let CityElement=document.querySelector("#city");
    let DescriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    //feelslikeElement.innerHTML = Math.round(response.data.main.feels_like);
    let feelslikeElement=document.querySelector("#feelslike");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");

    
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    CityElement.innerHTML=response.data.name;
    DescriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);

}
let apiKey="ef536c135f931c48635e435d71067995";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;
console.log(apiUrl);
//fetching the results of the api in javascript using axios
axios.get(apiUrl).then(displayTemperature);

   
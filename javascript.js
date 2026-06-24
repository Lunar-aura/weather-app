

 const apiKey = "9c943a854b13d4de02277235040ecede";

function updateDate(){

const now =
new Date();

document.getElementById("date")
.innerHTML =
now.toDateString();

}

updateDate();

function formatTime(unix){

const date =
new Date(unix * 1000);

return date.toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
});

}

async function getWeather(){

const city =
document.getElementById("cityInput").value;

const error =
document.getElementById("error");

if(city === ""){

error.innerHTML =
"Please enter city name";

return;

}

const apiUrl =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

try{

const response =
await fetch(apiUrl);

const data =
await response.json();

if(data.cod != 200){

error.innerHTML =
"City not found";

return;

}

error.innerHTML = "";

document.getElementById("temp")
.innerHTML =
`${Math.round(data.main.temp)}°`;

document.getElementById("city")
.innerHTML =
data.name;

document.getElementById("desc")
.innerHTML =
data.weather[0].description;

document.getElementById("humidity")
.innerHTML =
`${data.main.humidity}%`;

document.getElementById("wind")
.innerHTML =
`${Math.round(data.wind.speed)} km/h`;

document.getElementById("feels")
.innerHTML =
`${Math.round(data.main.feels_like)}°`;

document.getElementById("pressure")
.innerHTML =
data.main.pressure;

document.getElementById("sunrise")
.innerHTML =
formatTime(data.sys.sunrise);

document.getElementById("sunset")
.innerHTML =
formatTime(data.sys.sunset);

const icon =
data.weather[0].icon;

document.getElementById("weatherIcon")
.src =
`https://openweathermap.org/img/wn/${icon}@4x.png`;

}

catch{

error.innerHTML =
"Something went wrong";

}

}

document.getElementById("cityInput")
.addEventListener("keypress",
function(e){

if(e.key === "Enter"){

getWeather();

}

});

window.onload = () => {

document.getElementById("cityInput")
.value = "Islamabad";

getWeather();

}


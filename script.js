let apikey = config.MY_API_TOKEN;

const weatherDescription = document.querySelector('.weather-description');
const weatherCity = document.querySelector('.weather-city-name');
const weatherTemp = document.querySelector('.weather-feels-like');
const weatherDetailLat = document.querySelector(".detail-lat")
const weatherDetailLon = document.querySelector(".detail-lon")
const weatherDetailHum = document.querySelector(".detail-hum")
const weatherDetailPre = document.querySelector(".detail-pre")
const weatherDetailVis = document.querySelector(".detail-vis")
const weatherDetailWinDeg = document.querySelector(".detail-win-deg")
const weatherDetailWinSpe = document.querySelector(".detail-win-spe")
const newWeatherInput = document.querySelector('.select-city');
const requestButton = document.querySelector('.request');
const requestForm = document.querySelector('.request-city');

const weatherTempMin = document.querySelector('.temp-min');
const weatherTempMax = document.querySelector('.temp-max');
const weatherSunrise = document.querySelector('.sunrise');
const weatherSunset = document.querySelector('.sunset');

let query = 'Utrecht';
let units = 'metric';

requestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    query = newWeatherInput.value;
    if(query === '') return;
    getWeatherData();
})



async function fetchWeatherData(query) {
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apikey}`);
        const data = await response.json();    
        return data;
    } catch {
        console.log('City not Found');
    }
}

async function getWeatherData() {
    const data = await fetchWeatherData(query);
    // if()

    // populatimg the dom with the info fetched
    weatherDescription.textContent = data.weather[0].description;
    weatherCity.textContent = data.name + ', ' + data.sys.country;
    //convert this to celsius
    weatherTemp.textContent = "Feels like" + ' ' + data.main.feels_like + ' ' + '°C';

    // population details
    weatherDetailLat.textContent = "Latitude" + ' ' + data.coord.lat + '°'; 
    weatherDetailLon.textContent = "Longitude" + ' ' + data.coord.lon + '°';
    weatherDetailHum.textContent = "Humidity" + ' ' + data.main.humidity + '%';
    weatherDetailPre.textContent = "Pressure" + ' ' + data.main.pressure + ' Pa';
    weatherDetailVis.textContent = "Visibility" + ' ' + data.visibility + ' m';
    weatherDetailWinDeg.textContent = "Wind Angle" + ' ' + data.wind.deg + '°';
    weatherDetailWinSpe.textContent = "Wind Speed" + ' ' + data.wind.speed + ' km/h';

    // population forecast info
    weatherTempMin.textContent = "Min Temperature" + ' ' + data.main.temp_min + '°C'
    weatherTempMax.textContent = "Max Temperature" + ' ' + data.main.temp_max + '°C'

    // functions to get sunrise and sunset time
    // sunrise
    let sunriseTime = data.sys.sunrise;
    let sunriseDate = new Date(sunriseTime * 1000);
    let sunriseHours = sunriseDate.getUTCHours();
    let sunriseMinutes = "0" + sunriseDate.getUTCMinutes();
    let sunriseSeconds = "0" + sunriseDate.getUTCSeconds();
    let sunriseFormattedTime = sunriseHours + ':' + sunriseMinutes.substr(-2) + ':' + sunriseSeconds.substr(-2);

    // sunset
    let sunsetTime = data.sys.sunset;
    let sunsetDate = new Date(sunsetTime * 1000);
    let sunsetHours = sunsetDate.getUTCHours();
    let sunsetMinutes = "0" + sunsetDate.getUTCMinutes();
    let sunsetSeconds = "0" + sunsetDate.getUTCSeconds();
    let sunsetFormattedTime = sunsetHours + ':' + sunsetMinutes.substr(-2) + ':' + sunsetSeconds.substr(-2);

    weatherSunrise.textContent = "Expected Sunrise at" + ' ' + sunriseFormattedTime;
    weatherSunset.textContent = "Expected Sunset at" + ' ' + sunsetFormattedTime;
    
}

getWeatherData();

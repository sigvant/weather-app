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

let query = 'London';
let units = 'metric';

requestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    query = newWeatherInput.value;
    getWeatherData();
})



async function fetchWeatherData(query) {
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=86b625b781f7ebc6b0a33dd8d7c37d66`);
        const data = await response.json();    
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getWeatherData() {
    const data = await fetchWeatherData(query);
    console.log(data);

    // populatimg the dom with the info fetched
    weatherDescription.textContent = data.weather[0].description;
    weatherCity.textContent = data.name + ', ' + data.sys.country;
    //convert this to celsius
    weatherTemp.textContent = data.main.feels_like + ' ' + 'K';

    // population details
    weatherDetailLat.textContent = "Latitude" + ' ' + data.coord.lat + '°'; 
    weatherDetailLon.textContent = "Longitude" + ' ' + data.coord.lon + '°';
    weatherDetailHum.textContent = "Humidity" + ' ' + data.main.humidity + '%';
    weatherDetailPre.textContent = "Pressure" + ' ' + data.main.pressure + ' Pa';
    weatherDetailVis.textContent = "Visibility" + ' ' + data.visibility + ' m';
    weatherDetailWinDeg.textContent = "Wind Angle" + ' ' + data.wind.deg + '°';
    weatherDetailWinSpe.textContent = "Wind Speed" + ' ' + data.wind.speed + ' m/s';
    
}

getWeatherData();
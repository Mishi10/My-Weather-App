

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function fetchWeather(city) {
    const APIKey = 'a9ac1fc0d3e3076031f29292b2c745cd';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                if (container) container.style.height = '400px';
                if (weatherBox) weatherBox.classList.remove('active');
                if (weatherDetails) weatherDetails.classList.remove('active');
                if (error404) error404.classList.add('active');
                return;
            }

            displayWeather(json);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
}

function fetchWeatherByCoords(lat, lon) {
    const APIKey = 'a9ac1fc0d3e3076031f29292b2c745cd';

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                if (container) container.style.height = '400px';
                if (weatherBox) weatherBox.classList.remove('active');
                if (weatherDetails) weatherDetails.classList.remove('active');
                if (error404) error404.classList.add('active');
                return;
            }

            displayWeather(json);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
}

function displayWeather(json) {
    if (container) container.style.height = '555px';
    if (weatherBox) weatherBox.classList.add('active');
    if (weatherDetails) weatherDetails.classList.add('active');
    if (error404) error404.classList.remove('active');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    if (!image || !temperature || !description || !humidity || !wind) {
        console.error('Some elements are missing in the DOM');
        console.log('image:', image);
        console.log('temperature:', temperature);
        console.log('description:', description);
        console.log('humidity:', humidity);
        console.log('wind:', wind);
        return;
    }

    switch (json.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Clouds':
            image.src = 'images/clouds.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        case 'Mist':
            image.src = 'images/mist.png';
            break;
        case 'Haze':
            image.src = 'images/mist.png';
            break;
        default:
            image.src = 'images/clouds.png';
            break;
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
}

search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;
    if (city === '') return;
    fetchWeather(city);
});

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, error => {
            console.error('Error getting the current location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

document.addEventListener('DOMContentLoaded', getCurrentLocation);




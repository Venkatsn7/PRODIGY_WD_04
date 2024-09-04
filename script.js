const apiKey = '0de6a096a58848eb582cfac2b29f67fa';
const weatherInfoDiv = document.getElementById('weather-info');

document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location-input').value;
    fetchWeatherByLocation(location);
});

document.getElementById('current-location-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        });
    } else {
        weatherInfoDiv.innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
});

function fetchWeatherByLocation(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            weatherInfoDiv.innerHTML = '<p>Location not found. Please try again.</p>';
        });
}

function fetchWeatherByCoordinates(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            weatherInfoDiv.innerHTML = '<p>Unable to retrieve weather data. Please try again.</p>';
        });
}

function displayWeatherData(data) {
    weatherInfoDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="weather-data">Temperature: ${data.main.temp} °C</div>
        <div class="weather-data">Weather: ${data.weather[0].description}</div>
        <div class="weather-data">Humidity: ${data.main.humidity}%</div>
        <div class="weather-data">Wind Speed: ${data.wind.speed} m/s</div>
    `;
}

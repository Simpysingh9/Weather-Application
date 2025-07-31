const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

function getFakeWeather(city) {
    // Generate pseudo-random data based on city name
    let hash = 0;
    for (let i = 0; i < city.length; i++) {
        hash = city.charCodeAt(i) + ((hash << 5) - hash);
    }
    function seededRandom(seed, min, max) {
        const x = Math.abs(Math.sin(seed) * 10000) % 1;
        return Math.floor(x * (max - min + 1)) + min;
    }
    return {
        name: city,
        country: 'IN',
        temp: seededRandom(hash, 15, 40),
        humidity: seededRandom(hash + 1, 30, 90),
        wind: (seededRandom(hash + 2, 1, 10) + Math.random()).toFixed(1),
        precipitation: seededRandom(hash + 3, 0, 10)
    };
}

function setWeatherBackground(temp, precipitation) {
    const body = document.body;
    body.classList.remove('sunny', 'cloudy', 'rainy', 'snowy', 'default');
    
    if (precipitation > 5) {
        body.classList.add('rainy');
    } else if (temp < 5) {
        body.classList.add('snowy');
    } else if (temp > 25) {
        body.classList.add('sunny');
    } else {
        body.classList.add('cloudy');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;
    weatherResult.innerHTML = 'Loading...';
    setTimeout(() => {
        const data = getFakeWeather(city);
        setWeatherBackground(data.temp, data.precipitation);
        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.country}</h2>
            <p><strong>Temperature:</strong> ${data.temp} °C</p>
            <p><strong>Humidity:</strong> ${data.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind} m/s</p>
            <p><strong>Precipitation:</strong> ${data.precipitation} mm</p>
        `;
    }, 600);
}); 
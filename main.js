const apikey = "97de8067b112136435cc2a89607960a4";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&APPID=${apikey}`);

        if(!response.ok){
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        
        const temperature = Math.round(data.main.temp);
        let temp = Math.round(temperature - 273.15);

        const description = data.weather[0].description;

        const logo = data.weather[0].icon;

        const Feels = data.main.feels_like;
        let like = Math.round(Feels - 273.15);

        const Humidity = data.main.humidity;

        const windSpeed = data.wind.speed;

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${logo}.png" alt="Weather Icon">`;

        weatherDataEl.querySelector(".temperature").textContent = `${temp}°C`;

        weatherDataEl.querySelector(".description").textContent =description;

        weatherDataEl.querySelector(".feel").textContent = `Feels like : ${like}°C`;

        weatherDataEl.querySelector(".humidity").textContent = `Humidity : ${Humidity}%`;

        weatherDataEl.querySelector(".speed").textContent = `Wind Speed : ${windSpeed}m/s`;

    }catch(error){
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent =" An error happened,please try again";
        weatherDataEl.querySelector(".feel").textContent = "";
        weatherDataEl.querySelector(".humidity").textContent = "";
        weatherDataEl.querySelector(".speed").textContent = "";
    }
};

var apiKey = config.MY_KEY;
var secretkey = config.SECRET_KEY;
let weather = {
    fetchWeather: function (city) {
        // Fetching the api information
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    // All the information being displayed
    displayWeather: function(data) {
        const{name} = data;
        const{icon, description} = data.weather[0];
        const{temp, humidity} = data.main;
        const{speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind Speed: ${speed} km/h`;
        document.querySelector(".weather").classList.remove("loading");
        // Displaying pictures of the cities searched
        document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button").addEventListener("click",function () {
    weather.search();
});

// Allows user to use the enter key to input whatever is in the search bar
document.querySelector(".search-bar").addEventListener('keyup',function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});


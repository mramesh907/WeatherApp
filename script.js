
const apiKey ="b8ca232903eef0b95b8c28d933e08ad4";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

document.querySelector(".search-bar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = document.querySelector(".search-bar").value;
    const weatherIcon = document.querySelector(".weather-icon");
    const description = document.querySelector(".description");
    const errorMessage = document.querySelector(".error-message");
    const Url = apiUrl + `&appid=${apiKey}&q=${city}`;

    try {
        const resp = await fetch(Url);
        const respData = await resp.json();

        if (respData.cod === "404") {
            errorMessage.style.display = "block"; // Show error message
            errorMessage.innerHTML = "City not found. Please enter a valid city.";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".search-bar").value = "";
            return;
        }

        errorMessage.style.display = "none"; // Hide error message if city is found
        document.querySelector(".weather").style.display = "block";
        const pic_name = respData.weather[0].main;
        const path = `./images/${pic_name}.png`;
        weatherIcon.src = path;
        description.innerHTML = respData.weather[0].main;

        document.querySelector(".temperature").innerHTML = Math.round(respData.main.temp) + "°C";
        document.querySelector(".feels-like span").innerHTML = Math.round(respData.main.feels_like) + "°C";
        console.log(respData.main.feels_like);
        document.querySelector(".city").innerHTML = city.toUpperCase() + `, ${respData.sys.country}`;
        document.querySelector(".humidity").innerHTML = respData.main.humidity + "%";
        document.querySelector(".wind").innerHTML = respData.wind.speed + " Km/h";
        document.querySelector(".search-bar").value = "";
    } catch (error) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "An error occurred. Please try again.";
    }
}

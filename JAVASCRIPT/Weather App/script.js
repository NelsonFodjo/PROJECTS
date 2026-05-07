const apiKey = "fbd8230379edaa6c1c471717941e0b1b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    if(data.cod == "404"){
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "flex";
     }
    else{
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
    console.log(data);
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    };

    document.querySelector(".weather").style.display = "block";
    }
}


searchBtn.addEventListener("click", ()=>{
    searchBtn.classList.add("grow");
    setTimeout(() => {
        searchBtn.classList.remove("grow");
    }, 200);
    checkWeather(searchBox.value);
});

searchBtn.addEventListener("click")


searchBox.addEventListener("keydown", (e) => {if(e.key == "Enter"){checkWeather(searchBox.value);}});

import { fetchCityData, fetchData } from "./fetchAPI.js";
import { getWeatherData } from "./fetchAPI.js";
let capitalize = require("capitalize");
import { unixTimeConversion } from "./unixTimeConvert.js";
import { format } from "date-fns";
import { unixDayConversion } from "./unixTimeConvert.js";
import { backgroundTheme } from "./changeTheme.js";

async function populateInfo(city) {
    let cityWeather;
    let selectedCity;


    // ASIDE CONTENT //
    const currentCondition = document.querySelector("#currentCondition");
    const cityName = document.querySelector("#cityName");
    const dateTime = document.querySelector("#dateTime");
    const currentTemp = document.querySelector("#currentTemp");

    cityWeather = await getWeatherData(city);
    currentCondition.innerText = capitalize.words(cityWeather.current.weather[0].description);

    selectedCity = await fetchCityData(city);

    // CLEAN THIS UP SOMEHOW //
    cityName.innerText = capitalize.words(`${selectedCity.cityInfo.name}, ${selectedCity.cityInfo.state}, ${selectedCity.cityInfo.country}`)
    let todaysDate = format(new Date(), "MMMM dd, yyyy");
    dateTime.innerText = todaysDate;
    currentTemp.innerText = Math.round(cityWeather.current.temp) + "°F";

    // MAIN CONTENT (HOURLY & DAILY) //
    const hourlyForecast = document.querySelector("#hourlyForecast");
    const weeklyForecast = document.querySelector("#weeklyForecast");

    let hourlyArr = cityWeather.hourly;
    hourlyForecast.innerHTML = "";
    // APPEND DATA LOOP //
    for (let i = 0; i < hourlyArr.length; i++) {
        const hourCard = document.createElement("div");
        hourCard.classList.add("hourCard");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        const time = document.createElement("p");
        const deg = document.createElement("p");


        time.append(unixTimeConversion(hourlyArr[i].dt))
        deg.append(Math.round(hourlyArr[i].temp) + " °F")
        // console.log(deg);

        backgroundTheme(cityWeather.current.weather[0].main);

        infoDiv.append(time);
        infoDiv.append(deg);
        hourCard.append(infoDiv);
        hourlyForecast.append(hourCard);
    }

    let dailyArr = cityWeather.daily;
    weeklyForecast.innerHTML = "";
    console.log(dailyArr);
    for (let i = 0; i < dailyArr.length; i++) {

        // DAY INFO //
        const dayCard = document.createElement("div");
        const infoDiv = document.createElement("div");
        dayCard.classList.add("dayCard");
        infoDiv.classList.add("info");

        // HIGHS AND LOWS OF DAY //
        const day = document.createElement("p");
        const weatherIcon = document.createElement("img");
        const high = document.createElement("p");
        const low = document.createElement("p");

        weatherIcon.src = iconChoice(dailyArr[i].weather[0].main);

        day.append(unixDayConversion(dailyArr[i].dt));

        high.append("H: " + Math.round(dailyArr[i].temp.max) + " °F")
        low.append("L: " + Math.round(dailyArr[i].temp.min) + " °F")

        infoDiv.append(day);
        infoDiv.append(weatherIcon);
        infoDiv.append(high);
        infoDiv.append(low);
        dayCard.append(infoDiv);
        weeklyForecast.append(dayCard);



        // SUNRISE AND SUNET INFO //
        const sunrise = document.createElement("img");
        const sunset = document.createElement("img");
        const riseTime = document.createElement("p");
        const setTime = document.createElement("p");

        sunrise.src = "/assets/icons/sunrise.svg";
        riseTime.innerText = unixTimeConversion(dailyArr[i].sunrise);
        sunset.src = "/assets/icons/sunset.svg";
        setTime.innerText = unixTimeConversion(dailyArr[i].sunset)


        infoDiv.append(sunrise);
        infoDiv.append(riseTime);
        infoDiv.append(sunset);
        infoDiv.append(setTime);
    }

    const bigIcon = document.querySelector("#bigIcon");

    bigIcon.src = iconChoice(cityWeather.current.weather[0].main)

    // set ICONS FOR DAILY FORECAST //
    function iconChoice(dailyInfo) {
        let sunny = "/assets/icons/sun.svg";
        let cloudy = "/assets/icons/cloud.svg";
        let rainy = "/assets/icons/cloud-rain.svg";
        let thunder = "/assets/icons/cloud-lightning.svg";
        let snow = "/assets/icons/cloud-snow.svg";
        let windy = "/assets/icons/wind.svg";
        console.log(dailyInfo);


        if (dailyInfo.includes("Clear")) return sunny;
        if (dailyInfo.includes("Clouds")) return cloudy;
        if (dailyInfo.includes("Rain")) return rainy;
        if (dailyInfo.includes("Thunderstorm")) return thunder;
        if (dailyInfo.includes("Snow")) return snow;
        if (dailyInfo.includes("windy")) return windy;

    }
    inputBox.value = "";
}


export { populateInfo }
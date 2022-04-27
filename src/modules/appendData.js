import { fetchCityData, fetchData } from "./fetchAPI.js";
import { getWeatherData } from "./fetchAPI.js";
let capitalize = require("capitalize");
import { unixTimeConversion } from "./unixTimeConvert.js";
import { format } from "date-fns";
import { unixDayConversion } from "./unixTimeConvert.js";

async function populateInfo(city) {
    let cityWeather;
    let selectedCity;


    // ASIDE CONTENT //
    const currentCondition = document.querySelector("#currentCondition");
    const cityName = document.querySelector("#cityName");
    const dateTime = document.querySelector("#dateTime");
    const currentTemp = document.querySelector("#currentTemp");
    const changeFormat = document.querySelector("#changeTempFormat");

    cityWeather = await getWeatherData(city);
    currentCondition.innerText = capitalize.words(cityWeather.current.weather[0].description);

    selectedCity = await fetchCityData(city);
    // console.log(selectedCity);

    // CLEAN THIS UP SOMEHOW //
    cityName.innerText = capitalize.words(`${selectedCity.cityInfo.name}, ${selectedCity.cityInfo.state}, ${selectedCity.cityInfo.country}`)
    let todaysDate = format(new Date(), "MMMM dd, yyyy");
    dateTime.innerText = todaysDate;
    currentTemp.innerText = Math.round(cityWeather.current.temp) + "°F";

    // MAIN CONTENT (HOURLY & DAILY) //
    // const currentWeather = document.querySelector("#currentWeather");
    // const futureWeather = document.querySelector("#futureWeather");
    const hourlyForecast = document.querySelector("#hourlyForecast");
    const weeklyForecast = document.querySelector("#weeklyForecast");

    let hourlyArr = cityWeather.hourly;

    hourlyForecast.innerHTML = "";
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

        infoDiv.append(time);
        infoDiv.append(deg);
        hourCard.append(infoDiv);
        hourlyForecast.append(hourCard);
    }

    let dailyArr = cityWeather.daily;
    weeklyForecast.innerHTML = "";
    console.log(dailyArr);

    for (let i = 0; i < dailyArr.length; i++) {

        const dayCard = document.createElement("div");
        dayCard.classList.add("dayCard");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        const day = document.createElement("p");
        const deg = document.createElement("p");

        day.append(unixDayConversion(dailyArr[i].dt));
        deg.append(Math.round(hourlyArr[i].temp) + " °F")

        infoDiv.append(day);
        infoDiv.append(deg);
        dayCard.append(infoDiv);
        weeklyForecast.append(dayCard);
    }

}


export { populateInfo }
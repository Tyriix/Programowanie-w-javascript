import WeatherAPI from "./WeatherAPI.js";
import GeoAPI from "./GeoAPI.js";

document.addEventListener("DOMContentLoaded", function () {
  ShowCities();
});

const searchInput = document.querySelector("#search-input");
const addBtn = document.querySelector("#add-btn");

const weatherApiKey = "ed5eba6f257f1a861d12ad59c58ba099";
const geoApiKey = "49a4c9be65594e4d8bc09e2c15850986";

addBtn.addEventListener("click", AddCity);
searchInput.addEventListener("input", function(){
    const cities = []
    const datalist = document.getElementById("cities-autocomplete")
    const geo = GeoAPI.GeocoderAutocomplete(searchInput.value, geoApiKey)
    
    // cities.forEach(city => {
    //     let option = document.createElement("option");
    //     option.value = city;
    //     datalist.appendChild(option);
    // });
})



function AddCity() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=` +
      searchInput.value +
      `&appid=` +
      weatherApiKey
  )
    .then((res) => res.json())
    .then((data) => {
      const cityToStorage = new WeatherAPI();

      let nameval = data["name"];
      let descrip = data["weather"]["0"]["description"];
      let tempature = (data["main"]["temp"] - 273).toFixed(0);
      let humidity = data["main"]["humidity"];
      let icon = data["weather"]["0"]["icon"];

      cityToStorage.name = nameval;
      cityToStorage.description = descrip;
      cityToStorage.tempature = tempature;
      cityToStorage.humidity = humidity;
      cityToStorage.icon = icon;
      ShowCity(cityToStorage);
      WeatherAPI.SaveCity(cityToStorage);
    })
    .catch((err) => alert(`You entered wrong city name.`));
}

function ShowCity(city) {
  const cityCard = document.querySelector(".cities__list-item");
//   console.log(cityCard);
  const existingCity = cityCard.cloneNode(true);

  existingCity.querySelector("#city-name").innerText = city.name;
  existingCity.querySelector("#city-temperature").innerText =
    city.tempature + "℃";
  existingCity.querySelector("#city-weather").innerText = city.description;
  existingCity.querySelector("#city-humidity").innerText = city.humidity + "%";
  existingCity.querySelector(
    "img"
  ).src = `http://openweathermap.org/img/wn/${city.icon}@2x.png`;
  document.querySelector(".cities__list").appendChild(existingCity);
}

function ShowCities() {
  const cities = WeatherAPI.GetAllCities();
//   console.log(cities);
  cities.forEach((city) => {
    // console.log(city);
    ShowCity(city);
  });
}


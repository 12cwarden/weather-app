const weatherApp = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

//pageload
let cityInput = "Winston";

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    weatherApp.style.opacity = "0"; //app fade
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value.length === 0) {
    alert("Please type in a city name.");
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = ""; //remove previous search
    weatherApp.style.opacity = "0"; //app fade
  }
});

function dayOfWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekday[new Date(`${month}/${day}/${year}`).getDay()];
}

function fetchWeatherData() {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=22170f0fd1f04665b8b111709222707&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      temp.innerHTML = Math.round(data.current.temp_f) + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      //date reformat
      dateOutput.innerHTML = `${dayOfWeek(d, m, y)} ${d},  ${m} ${y}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.location.name;

      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
      icon.src = "./icons/" + iconId;

      //weather details
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_mph + "mph";

      let timeOfDay = "day";
      const code = data.current.condition.code; //weather condition

      //change from night to day
      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      //sunny
      if (code === 1000) {
        weatherApp.style.backgroundImage = `url(./images/${timeOfDay}/sunny.png)`;
        btn.style.background = "#30D5E5";
        if (timeOfDay === "night") {
          btn.style.background = "#181e27";
        }
      }
      //cloudy
      else if (
        code === 1003 ||
        code === 1006 ||
        code === 1009 ||
        code === 1030 ||
        code === 1069 ||
        code === 1087 ||
        code === 1135 ||
        code === 1273 ||
        code === 1276 ||
        code === 1279 ||
        code === 1282
      ) {
        weatherApp.style.backgroundImage = `url(./images/${timeOfDay}/cloud.png)`;
        btn.style.background = "#be64a8";
        if (timeOfDay === "night") {
          btn.style.background = "#DC94C1";
        }
      }

      //rain
      else if (
        code === 1063 ||
        code === 1069 ||
        code === 1072 ||
        code === 1150 ||
        code === 1153 ||
        code === 1180 ||
        code === 1183 ||
        code === 1186 ||
        code === 1189 ||
        code === 1192 ||
        code === 1195 ||
        code === 1204 ||
        code === 1207 ||
        code === 1240 ||
        code === 1243 ||
        code === 1246 ||
        code === 1249 ||
        code === 1252
      ) {
        weatherApp.style.backgroundImage = `url(./images/${timeOfDay}/rain.png)`;
        btn.style.background = "#073113";
        if (timeOfDay === "night") {
          btn.style.background = "#6888A7";
        }
      }

      //snow
      else {
        weatherApp.style.backgroundImage = `url(./images/${timeOfDay}/snow.png)`;
        btn.style.background = "#AECEEC";
        if (timeOfDay === "night") {
          btn.style.background = "#1E364D";
        }
      }
      weatherApp.style.opacity = "1";
    })
    .catch(() => {
      alert("City not found, please try another.");
      weatherApp.style.opacity = "1";
    });
}

fetchWeatherData();

weatherApp.style.opacity = "1";

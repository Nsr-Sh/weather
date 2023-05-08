// select elements
const input = document.querySelector("#box input"),
  searchBtn = document.querySelector("#box i"),
  city = document.querySelector("#city"),
  temp = document.querySelector("#temp"),
  wind = document.querySelector("#wind"),
  humidity = document.querySelector("#humidity"),
  img = document.querySelector("#img"),
  des = document.querySelector("#desTxt"),
  apiKey = "87ab862050fd34bc774a93591de17362";

// event
searchBtn.addEventListener("click", () => {
  getWeatherData(input.value).then((res) => {
    data = JSON.parse(res);
    console.log(data);
    city.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°c`;
    wind.textContent = `${Math.round(data.wind.speed)}km/h`;
    img.src = `assets/images/${data.weather[0].main}.png`;
    document.querySelector(
      "#image"
    ).src = `assets/images/${data.weather[0].main}.png`;
    if (data.weather[0].main == "Clouds") {
      des.textContent = "cloudy";
    } else if (data.weather[0].main == "Clear") {
      des.textContent = "clear";
    } else if (data.weather[0].main == "Rain") {
      des.textContent = "rainy";
    } else if (data.weather[0].main == "Snow") {
      des.textContent = "snowy";
    } else if (data.weather[0].main == "Drizzle") {
      des.textContent = "drizzle";
    } else if (data.weather[0].main == "Mist") {
      des.textContent = "mist";
    }
  });
  .catch((err) => {
    console.log(err);
  });
});

// Function getWeatherData
function getWeatherData(cityName) {
  return new Promise(function (resolve, reject) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const req = new XMLHttpRequest();
    req.open("Get", url);
    req.send();
    req.onload = function () {
      if (req.status === 200) {
        resolve(this.responseText);
      } else {
        reject("city not found");
      }
    };
  });
}
let data;

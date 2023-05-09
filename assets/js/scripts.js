// select elements
const input = document.querySelector("#box input"),
  searchBtn = document.querySelector("#box i"),
  city = document.querySelector("#city"),
  temp = document.querySelector("#temp"),
  wind = document.querySelector("#wind"),
  humidity = document.querySelector("#humidity"),
  img = document.querySelector("#img"),
  des = document.querySelector("#desTxt"),
  error = document.querySelector("#error");
apiKey = "87ab862050fd34bc774a93591de17362";
let data;

// event
searchBtn.addEventListener("click", () => {
  getWeatherData(input.value)
    .then((res) => {
      data = JSON.parse(res);
      updateDom(data);
    })
    .catch((err) => {
      error.style.display = "block";
    });
});

// Function getWeatherData: Send request to API and get data
// input: city name
// output: json response object (request.responseText)
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
// Function updateDom:Update the DOM based on data received from the API
function updateDom(data) {
  if (error.style.display == "block") error.style.display = "none";
  city.textContent = data.name;
  temp.textContent = `${Math.round(data.main.temp)}°c`;
  wind.textContent = `${Math.round(data.wind.speed)}km/h`;
  img.src = `assets/images/${data.weather[0].main}.png`;
  document.querySelector(
    "#image"
  ).src = `assets/images/${data.weather[0].main}.png`;

  // change description
  switch (data.weather[0].main) {
    case "Clouds":
      des.textContent = "cloudy";
      break;
    case "Clear":
      des.textContent = "cleary";
      break;

    case "Rain":
      des.textContent = "rainy";
      break;

    case "Snow":
      des.textContent = "snowy";
      break;

    case "Drizzle":
      des.textContent = "drizzling";
      break;

    case "Mist":
      des.textContent = "misty";
      break;
    default:
      des.textContent = "drizzle";
  }
}

const mainbox = document.querySelector(".main");
const temp = document.querySelector(".js-temp");
const weather = document.querySelector(".js-weather");
const weatherIcon = document.querySelector(".js-weatherIcon");

const API_KEY ="0ac1ec9548649202513dcfeae5010d37";
const COORDS = "coords";
const SNOW = "snow";

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const temperature = json.main.temp;
            const place = json.name;
            const main = json.weather[0].main;
            temp.innerText = `${temperature} ℃ in ${place}`;
            weather.innerText = `${main}`;
            const weatherText = weather.innerText;
            if (weatherText === "Rain" || weatherText === "Drizzle") {
                weatherIcon.innerText = "☔";
            }
            if (weatherText === "Snow") {
                weatherIcon.innerText = "⛄";
                mainbox.classList.add(SNOW);                
            }
            if (weatherText === "Clear") {
                weatherIcon.innerText = "";
            }
            if (weatherText === "Clouds") {
                weatherIcon.innerText = "☁";
            }
            if (weatherText !== "Rain" && weatherText !== "Drizzle" && weatherText !== "Snow" && weatherText !== "Clear" && weatherText !== "Clouds") {
                weatherIcon.innerText = "🌫";
            }
        });
        //then은 기본적으로 함수를 호출하지만 데이터가 완전히 들어온 다음 호출하는 것이다.
        //pending은 대기상태라는 뜻, 가져온 데이터를 처리중이라는 뜻. 이거때문에 then을 사용함.
    }

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log('cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();      
}

init();

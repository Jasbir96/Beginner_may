/****selection**/
let searchBtn = document.querySelector(".search");
let input = document.querySelector("input");
// add Event Listenr
searchBtn.addEventListener("click", function () {
    let cityName = input.value;
    if (cityName == "") {
        return;
    }
    // console.log(cityName);
    fetchNUpdateUI(cityName);
})
/****selection for update UI***/
let tempElem = document.querySelector(".temp");
let locationElem = document.querySelector(".time_location>p")
let timingElem = document.querySelector(".time_location>span")
let imgElem = document.querySelector(".weather_condition img");
let conditionElem = document.querySelector(".weather_condition span");

let apiKey = "73fb86b5c79b4a51a8f142823230209";

async function fetchNUpdateUI(cityName) {
    try {
        let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;
        let response = await fetch(url);
        let json = await response.json();
        if (json.error) {
            alert("Please enter a valid location");
            return;
        }

        console.log("json", json);
        // console.log("temperature", json.current.temp_c);
        // console.log("image link", json.current.condition.icon);
        // console.log("location", json.location.name);
        // console.log("time and date", json.current.last_updated);
        // console.log("condition", json.current.condition.text);
        // filter out the data
        let temp = json.current.temp_c;
        let locationName = json.location.name;
        let timeStamp = json.current.last_updated;
        let iconLink = json.current.condition.icon;
        let conditionText = json.current.condition.text;
        //    update on the ui
        updateUI(temp, locationName, timeStamp, iconLink, conditionText);

    } catch (err) {
        console.log("err", err);
    }

}


function updateUI(temp, locationName,
    timeStamp, iconLink, conditionText) {
    tempElem.textContent = temp;
    locationElem.textContent = locationName;
    timingElem.textContent = timeStamp;
    conditionElem.textContent = conditionText;
    imgElem.setAttribute("src", iconLink);

}
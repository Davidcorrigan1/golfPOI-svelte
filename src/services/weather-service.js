//-------------------------------------------------------------------------------------------------
// The getWeather(long,lat) will use the open weather api to retrieve weather at given longitude
// and latitude coordinates. It will return a weather object with details.
//-------------------------------------------------------------------------------------------------

import axios from "axios";

export class WeatherAPI {

    constructor() {

    }

    async getWeather(latitude, longitude) {
        const lon = longitude;
        const lat = latitude;
        const apiKey = "901eebeb4f4a5848523d3c1bd3682264";
        try {
            console.log(`Weather API Key = ${apiKey}`);
            let weather = {};
            const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            const response = await axios.get(weatherRequest);
            if (response.status == 200) {
                weather = response.data
                console.log("Weather:" + weather.weather[0].description);
            } else {
                console.log("Could not find Weather at these coordinates")
            };

            return weather;
        } catch (err) {
            console.log(err);
            let weather = {};
            return weather;
        }
    }
};


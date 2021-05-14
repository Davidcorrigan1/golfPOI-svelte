<script>
    import {user, currentCourse} from "../stores";
    import {getContext, onMount} from "svelte";
    import {WeatherAPI} from '../services/weather-service';
    const golfPOIService = getContext("GolfPOIService");

    let weatherAPI;
    let errorMessage = "";
    let courseToBeUpdated;
    let currentWeather = {};
    let weatherDesc;
    let weatherFeelsLike;
    let weatherWindSpeed;
    let weatherHumidity;

    onMount(async () => {
        courseToBeUpdated = await golfPOIService.getCourse($currentCourse._id);
        currentWeather =await golfPOIService.getGolfPOIWeather(courseToBeUpdated.location.coordinates[1], courseToBeUpdated.location.coordinates[0]);
        console.log(currentWeather);
        weatherDesc = currentWeather.weather[0].description;
        weatherFeelsLike = currentWeather.main.feels_like;
        weatherWindSpeed = currentWeather.wind.speed;
        weatherHumidity = currentWeather.main.humidity;
        //currentWeather = await weatherAPI.getWeather(currentGolfPOI.location.coordinates[1], currentGolfPOI.location.coordinates[0]);
    })
</script>

<div class="uk-card uk-card-default uk-padding-small uk-visible@m">
    <table class="uk-table">
        <thead>
            <th>Weather Overview</th>
            <th>Current Temperature (C)</th>
            <th>Wind Speed (M/S)</th>
            <th>Humidity</th>
        </thead>
        <tbody class="uk-text-left">
        {#if currentWeather}
            <tr>
                <td>{weatherDesc}</td>
                <td>{weatherFeelsLike}</td>
                <td>{weatherWindSpeed}</td>
                <td>{weatherHumidity}</td>
            </tr>
        {/if}
        </tbody>
    </table>
</div>
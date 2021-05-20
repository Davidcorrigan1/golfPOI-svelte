<script>
    import 'leaflet/dist/leaflet.css';
    import {user, currentCourse, adminBar, navBar, mainBar, subTitle, title, courseCount} from "../stores";
    import {getContext, onMount} from "svelte";
    import {LeafletMap} from '../services/leaflet-map';
    const golfPOIService = getContext("GolfPOIService");

    let errorMessage = "";
    let currentGolfPOI;
    let currentLongitude = 0.0;
    let currentLatitude = 0.0;
    let courseName="";
    let courseDesc="";
    let currentWeather = {};
    let weatherDesc;
    let weatherFeelsLike;
    let weatherWindSpeed;
    let weatherHumidity;
    let images =[];
    let map;
    let lat;
    let lng;

    let navigation;
    if ($user.adminUser === true) {
        navigation = adminBar;
        navigation[4].count = $courseCount.toString();
    } else {
        navigation = mainBar;
    }

    export let params = {};
    console.log("parameters:");
    console.log(params);

    title.set("Golf Courses of Ireland");
    subTitle.set("Displaying Course Details");
    navBar.set({
        bar: navigation
    });

    onMount(async () => {
        currentGolfPOI = await golfPOIService.getCourse(params.wild);
        currentWeather =await golfPOIService.getGolfPOIWeather(currentGolfPOI.location.coordinates[1], currentGolfPOI.location.coordinates[0]);
        images = await golfPOIService.getImageList(currentGolfPOI.relatedImages)
        weatherDesc = currentWeather.weather[0].description;
        weatherFeelsLike = currentWeather.main.feels_like;
        weatherWindSpeed = currentWeather.wind.speed;
        weatherHumidity = currentWeather.main.humidity;
        currentLongitude = currentGolfPOI.location.coordinates[0];
        currentLatitude = currentGolfPOI.location.coordinates[1];
        courseName = currentGolfPOI.courseName;
        courseDesc = currentGolfPOI.courseDesc;
        lat = currentGolfPOI.location.coordinates[1];
        lng = currentGolfPOI.location.coordinates[0];
        const mapConfig = {
            location: {lat: lat, lng: lng},
            zoom: 15,
            minZoom: 7,
        };
        map = new LeafletMap("golfPOI-map", mapConfig, 'Satellite');
        map.addLayerGroup('golfPOIs');
        map.showZoomControl();
        map.showLayerControl();

        const courseList = await golfPOIService.getCourseList();
        const courseListStr = `${currentGolfPOI.courseName}`
        if (currentGolfPOI.location) {
            map.addMarker({lat: currentGolfPOI.location.coordinates[1], lng: currentGolfPOI.location.coordinates[0]}, courseListStr, 'golfPOIs');
        }
    });

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
<div class="uk-margin uk-width-1xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
    <table class="uk-table" uk-table-divider>

        <thead>
            <th class="uk-width-small">Course Name</th>
            <th class="uk-width-small">Course Description</th>
        </thead>
        <tbody class="uk-text-left">
        {#if currentGolfPOI}
            <tr>
                <td><a on:click={() => $currentCourse = currentGolfPOI } href="/#/updateCourse"> {courseName}</a></td>
                <td>{courseDesc}</td>
            </tr>
        {/if}
        </tbody>
    </table>
</div>
<div class="uk-margin uk-width-1xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
    <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-1-1">
        <div id="golfPOI-map" class="ui embed" style="height:800px"></div>
    </div>
</div>
<div class="uk-margin uk-width-1xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
    <div class="uk-child-width-1-4@s uk-flex uk-flex-left" uk-grid uk-height-match="target: .uk-card">
        {#each images as image}
            <div class="uk-card uk-card-default uk-card-small uk-text-center uk-text-baseline uk-animation-scale-up">
                <div class="uk-card-media-top">
                    <img src="{image.url}" width="400" height="220">
                </div>
            </div>
        {/each}
    </div>
</div>

<script>
    import 'leaflet/dist/leaflet.css';
    import {adminBar, currentCourse, courseCount, mainBar, navBar, subTitle, title, user} from "../stores"
    import {LeafletMap} from '../services/leaflet-map';
    import {getContext, onMount} from "svelte";
    const golfPOIService = getContext("GolfPOIService");

    let lat = 53.560858;
    let lng = -7.352420;

    let map;
    onMount(async () => {
        const mapConfig = {
            location: {lat: lat, lng: lng},
            zoom: 8,
            minZoom: 7,
        };
        map = new LeafletMap("golfPOI-map", mapConfig, 'Terrain');
        map.addLayerGroup('golfPOIs');
        map.showZoomControl();
        map.showLayerControl();

        const courseList = await golfPOIService.getCourseList();
        courseList.forEach(course=>{
            const courseListStr = `<a href='/#/displayPOI/${course._id}'>${course.courseName} <small>(click for details}</small></a>`
            if (course.location) {
                map.addMarker({lat: course.location.coordinates[1], lng: course.location.coordinates[0]}, courseListStr, 'golfPOIs');
            }
        });
    });

    let navigation;
    if ($user.adminUser === true) {
        navigation = adminBar;
        navigation[4].count = $courseCount.toString();
    } else {
        navigation = mainBar;
    }

    title.set("Golf Courses of Ireland");
    subTitle.set("Add a new Golf POI here");
    navBar.set({
        bar: navigation
    });

</script>

<div class="uk-flex-middle uk-text-center" uk-grid>
    <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-1-1">
        <div id="golfPOI-map" class="ui embed" style="height:800px"></div>
    </div>
</div>
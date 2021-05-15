<script>
  import {setContext} from "svelte";
  import {GolfPOIService} from "./services/golfPOI-service";

  import Main from "./pages/Main.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Settings from "./pages/Settings.svelte";
  import CourseReport from "./pages/CourseReport.svelte";
  import AddCategory from "./pages/AddCategory.svelte";
  import AddCourse from "./pages/AddCourse.svelte";
  import UpdateCourse from "./pages/UpdateCourse.svelte";
  import UserReport from "./pages/UserReport.svelte";
  import CourseCategory from "./pages/CourseCategory.svelte";
  import UpdateUser from "./pages/UpdateUser.svelte";
  import MapPOI from "./pages/MapPOI.svelte";
  import AddImage from "./pages/AddImage.svelte";
  import Navigator from "./components/Navigator.svelte";
  import Router from "svelte-spa-router";

  setContext("GolfPOIService", new GolfPOIService("http://localhost:4000"));

  let routes = {
    "/" : Main,
    "/login": Login,
    "/signup": Signup,
    "/settings": Settings,
    "/logout": Main,
    "/courseReport": CourseReport,
    "/addCategory": AddCategory,
    "/addCourse": AddCourse,
    "/updateCourse": UpdateCourse,
    "/userReport": UserReport,
    "/mapPOI": MapPOI,
    "/courseCategory": CourseCategory,
    "/updateUser": UpdateUser,
    "/addImage": AddImage
  };


</script>

<div class="uk-container">

  <div class="uk-container">
    <Navigator />
    <Router {routes} />
  </div>
</div>
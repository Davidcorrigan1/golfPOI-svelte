<script>
    import UpdateCourseForm from "../components/UpdateCourseForm.svelte";
    import {user, currentCourse, adminBar, navBar, mainBar, subTitle, title, courseCount} from "../Stores";
    import CourseImages from "../components/CourseImages.svelte";
    import CourseWeather from "../components/CourseWeather.svelte";

    let navigation;
    if ($user.adminUser === true) {
        navigation = adminBar;
        navigation[4].count = $courseCount.toString();
    } else {
        navigation = mainBar;
    }

    title.set("Golf Courses of Ireland");
    subTitle.set("Update the course Details");
    navBar.set({
        bar: navigation
    });
</script>

<div class="uk-container uk-margin-small">
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center " uk-grid>
        <div class="uk-width-expand@m">
            <CourseWeather/>
            <UpdateCourseForm/>
        </div>

    </div>
    <div class="uk-container uk-padding-small">
        <CourseImages imageCourse="{$currentCourse}" currentUser="{$user}"/>
    </div>
</div>
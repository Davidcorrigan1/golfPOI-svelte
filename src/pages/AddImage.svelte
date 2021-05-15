<script>
    import CourseImages from "../components/CourseImages.svelte";
    import AddImage from "../components/AddImage.svelte";
    import {user, currentCourse, adminBar, navBar, mainBar, subTitle, title, courseCount} from "../stores";

    let navigation;
    if ($user.adminUser === true) {
        navigation = adminBar;
        navigation[4].count = $courseCount.toString();
    } else {
        navigation = mainBar;
    }

    title.set("Golf Courses of Ireland");
    subTitle.set("Add a new images here");
    navBar.set({
        bar: navigation
    });
</script>

<div class="uk-container uk-padding-small">
    <AddImage imageCourse="{$currentCourse}"/>
</div>


<div class="uk-container uk-padding-small">
    <CourseImages imageCourse="{$currentCourse}" currentUser="{$user}"/>
</div>

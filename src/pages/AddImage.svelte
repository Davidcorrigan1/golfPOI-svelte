<script>
    import CourseImages from "../components/CourseImages.svelte";
    import AddImageForm from "../components/AddImageForm.svelte";
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

<div>
    <div class="uk-container uk-padding-small">
        <AddImageForm imageCourse="{$currentCourse}"/>
    </div>

    <div class="uk-container uk-padding-small">
        <CourseImages imageCourse="{$currentCourse}" currentUser="{$user}"/>
    </div>
</div>
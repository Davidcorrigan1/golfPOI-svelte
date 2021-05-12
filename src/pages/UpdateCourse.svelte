<script>
    import UpdateCourseForm from "../components/UpdateCourseForm.svelte";
    import {user, adminBar, navBar, mainBar, subTitle, title, courseCount} from "../stores";
    import CourseImages from "../components/CourseImages.svelte";

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
            <UpdateCourseForm/>
            <CourseImages/>
        </div>
    </div>
</div>